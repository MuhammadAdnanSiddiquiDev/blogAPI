# 🐞 Backend Bug Fixes

This document identifies common backend bugs, explains why they occur, and provides corrected code.

---

## ✅ Bug 1: SQL Injection

### ❌ Problem

User input is directly concatenated into the SQL query, making it vulnerable to SQL Injection attacks.

```js
db.query('SELECT * FROM users WHERE id = ' + req.query.id)
```

### ⚠️ Why it's a bug

Attackers can manipulate the query (e.g., `?id=1 OR 1=1`) to access unauthorized data.

### ✅ Fix

Use parameterized queries to safely handle user input.

```js
app.get('/users', (req, res) => {
  const { id } = req.query;

  db.query('SELECT * FROM users WHERE id = ?', [id])
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err.message }));
});
```

---

## ✅ Bug 2: Missing Error Handling

### ❌ Problem

Async function does not handle errors.

```js
const getUser = async (id) => {
  const user = await User.findById(id);
  return user;
};
```

### ⚠️ Why it's a bug

If database fails, server may crash due to unhandled promise rejection.

### ✅ Fix

Wrap logic in try/catch.

```js
const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};
```

---

## ✅ Bug 3: Plain Text Password

### ❌ Problem

Password is compared directly without hashing.

```js
const user = await User.findOne({ password });
```

### ⚠️ Why it's a bug

Passwords stored in plain text are insecure and can be easily compromised.

### ✅ Fix

Use bcrypt to compare hashed passwords.

```js
import bcrypt from "bcryptjs";

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json(user);
});
```

---

## ✅ Bug 4: Missing Await & Authorization

### ❌ Problem

* Missing `await`
* No authentication/authorization check

```js
Post.findByIdAndDelete(req.params.id);
```

### ⚠️ Why it's a bug

* Operation may fail silently
* Any user can delete any post

### ✅ Fix

```js
router.delete('/post/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

---

## ✅ Bug 5: Hardcoded JWT Secret

### ❌ Problem

JWT secret is hardcoded.

```js
jwt.sign({ id: user._id }, 'secret');
```

### ⚠️ Why it's a bug

Hardcoded secrets can be exposed and misused.

### ✅ Fix

Use environment variables.

```js
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
```

---

# 🎯 Conclusion

These fixes improve:

* Security (SQL Injection, Password hashing, JWT)
* Stability (Error handling)
* Authorization (User access control)

---
