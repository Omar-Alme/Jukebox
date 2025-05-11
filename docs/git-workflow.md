# 🧪 Git Workflow – Jukebox Playlist App

This document explains the Git process used in the development of the Jukebox app, including branching, commits, merges, and handling merge conflicts.

---

## 🌱 Branching Strategy

We used Git branches to organize development into clear, manageable features.

### 🔁 Main Branches

| Branch         | Purpose                              |
|----------------|---------------------------------------|
| `main`         | Final, production-ready version       |
| `development`  | Integration branch for merged features|
| `features/...` | One branch per feature (per moment)   |

---

## 🔨 Feature Branch Examples

### ✅ `features/example-branch`

**Purpose:** Refactor playlist/song structure.  
- Playlist has `name` + `genre`  
- Songs contain `title`, `artist`, `duration`

**Git Commands Used:**
```bash
git checkout -b features/song-artist-fields
# Code changes
git add .
git commit -m "Refactor song structure: move artist to song"
git push -u origin features/song-artist-fields
```

#### Merge into `development`
```bash
git checkout development
git merge features/song-artist-fields
git push
```

