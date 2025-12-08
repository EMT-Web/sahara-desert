# Dependency Conflict Fix

## Issue
Vercel deployment was failing with:
```
npm error peer @sanity/icons@"^2.0" from next-sanity@6.1.4
```

## Solution Applied

1. **Downgraded `@sanity/icons`** from `^3.7.4` to `^2.2.0` in `package.json`
   - This matches the peer dependency requirement of `next-sanity@6.0.0`

2. **Added `.npmrc` file** with `legacy-peer-deps=true`
   - This ensures npm handles peer dependencies more flexibly during installation

## Files Changed

- `package.json` - Updated `@sanity/icons` version
- `.npmrc` - Added npm configuration for peer dependencies

## Next Steps

1. **Commit and push the changes**:
   ```bash
   git add package.json .npmrc
   git commit -m "Fix dependency conflict: downgrade @sanity/icons to 2.2.0"
   git push origin main
   ```

2. **Vercel will automatically redeploy** with the fixed dependencies

3. **Verify the build** succeeds in Vercel dashboard

## Alternative Solution (if still failing)

If the issue persists, you can also:
- Remove `@sanity/icons` from dependencies if not directly used in your code
- Or update `next-sanity` to a newer version that supports `@sanity/icons@^3.x`

However, the current fix should resolve the issue since `@sanity/icons@2.2.0` is compatible with `next-sanity@6.0.0`.

