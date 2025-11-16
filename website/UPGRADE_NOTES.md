# Next.js 16 Upgrade Notes

## Changes Made

### Dependencies Updated
- ✅ **Next.js**: `14.2.0` → `16.0.3`
- ✅ **React**: `18.3.1` → `19.0.0`
- ✅ **React DOM**: `18.3.1` → `19.0.0`
- ✅ **eslint**: `8.56.0` → `9.0.0` (required by eslint-config-next@16)
- ✅ **eslint-config-next**: `14.2.0` → `16.0.3`
- ✅ **@types/react**: `18.2.0` → `19.0.0`
- ✅ **@types/react-dom**: `18.2.0` → `19.0.0`

### Configuration
- ✅ `next.config.js` - No breaking changes needed
- ✅ `experimental.optimizePackageImports` - Still supported
- ✅ Static export (`output: 'export'`) - Still supported

## Next Steps

1. **Install dependencies:**
   ```bash
   cd website
   npm install
   ```

2. **Run the Next.js codemod (optional but recommended):**
   ```bash
   npx @next/codemod@canary upgrade latest
   ```
   This will automatically fix any deprecated patterns.

3. **Test the build:**
   ```bash
   npm run build
   ```

4. **Test development server:**
   ```bash
   npm run dev
   ```

5. **Check for TypeScript errors:**
   ```bash
   npm run lint
   ```

## Potential Issues to Watch For

### React 19 Changes
- React 19 has some breaking changes. Most common issues:
  - Some third-party libraries may need updates
  - Type definitions may show new errors
  - `ref` prop handling has changed slightly

### Known Compatible Dependencies
- ✅ `next-mdx-remote@5.0.0` - Should work with Next.js 16
- ✅ `lucide-react@0.553.0` - Should work with React 19
- ✅ `@next/mdx@16.0.3` - Already at correct version

### If You Encounter Issues

1. **TypeScript errors**: May need to update `@types/*` packages
2. **Build errors**: Check if any dependencies need updates
3. **Runtime errors**: Check React 19 compatibility of third-party libraries

## Breaking Changes in Next.js 16

### Not Applicable to This Project
- ❌ **Middleware → Proxy**: No middleware file in this project
- ❌ **PPR changes**: Not using Partial Pre-Rendering

### Already Compatible
- ✅ App Router - Already using
- ✅ Static export - Already configured
- ✅ Client components - Already using `'use client'`

## Testing Checklist

- [ ] Development server starts without errors
- [ ] Production build completes successfully
- [ ] All pages load correctly
- [ ] MDX content renders properly
- [ ] Diagrams display correctly
- [ ] Search functionality works
- [ ] Progress tracker works
- [ ] Navigation works
- [ ] Static export generates correctly

## Rollback Plan

If issues occur, you can rollback by:
```bash
git checkout main  # or your previous branch
cd website
npm install
```

## Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16)

