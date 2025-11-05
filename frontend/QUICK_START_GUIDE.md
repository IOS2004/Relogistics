# 🚀 Quick Start Guide - Logistics Platform Frontend

## ⚡ Rapid Setup (5 Minutes)

### 1. Install Dependencies

```bash
cd logistics-platform/frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access Application

```
http://localhost:5173
```

---

## 📋 Quick Reference

### **Navigation URLs**

| Page      | URL          | Access  |
| --------- | ------------ | ------- |
| Login     | `/login`     | Public  |
| Register  | `/register`  | Public  |
| Dashboard | `/dashboard` | Private |
| Loads     | `/loads`     | Private |
| Vehicles  | `/vehicles`  | Private |
| Tracking  | `/tracking`  | Private |
| Payments  | `/payments`  | Private |
| Profile   | `/profile`   | Private |
| Settings  | `/settings`  | Private |

### **User Roles**

1. **Broker** - Posts loads, manages bids
2. **Vehicle Owner** - Manages vehicles, places bids
3. **Driver** - Executes trips, updates status

---

## 🔧 Common Tasks

### **Add New Page**

1. **Create page component:**

```jsx
// src/pages/NewPage.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import DashboardLayout from "../components/layout/DashboardLayout";

const NewPage = () => {
  return (
    <DashboardLayout>
      <Container>
        <Typography variant="h4">New Page</Typography>
      </Container>
    </DashboardLayout>
  );
};

export default NewPage;
```

2. **Add route:**

```jsx
// src/routes/Router.jsx
import NewPage from "../pages/NewPage.jsx";

// Add in Routes:
<Route
  path="/new-page"
  element={
    <PrivateRoute>
      <NewPage />
    </PrivateRoute>
  }
/>;
```

3. **Add sidebar link:**

```jsx
// src/components/layout/Sidebar.jsx
const menuItems = [
  // ... existing items
  { text: "New Page", icon: <Icon />, path: "/new-page" },
];
```

---

### **Create New Redux Slice**

```javascript
// src/store/slices/newSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("new/fetchData", async () => {
  const response = await fetch("/api/new");
  return response.json();
});

const newSlice = createSlice({
  name: "new",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newSlice.reducer;
```

**Register in store:**

```javascript
// src/store/index.js
import newReducer from "./slices/newSlice";

export const store = configureStore({
  reducer: {
    // ... existing reducers
    new: newReducer,
  },
});
```

---

### **Create Form Component**

```jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  field: yup.string().required("Field is required"),
});

const MyForm = ({ open, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: { field: "" },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Form Title</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            name="field"
            label="Field"
            value={formik.values.field}
            onChange={formik.handleChange}
            error={formik.touched.field && Boolean(formik.errors.field)}
            helperText={formik.touched.field && formik.errors.field}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MyForm;
```

---

## 🎨 UI Component Examples

### **Stats Card**

```jsx
<Card>
  <CardContent>
    <Box display="flex" alignItems="center" mb={2}>
      <Icon color="primary" />
      <Typography ml={1}>Title</Typography>
    </Box>
    <Typography variant="h4">Value</Typography>
    <Typography variant="body2" color="text.secondary">
      Description
    </Typography>
  </CardContent>
</Card>
```

### **Data Table**

```jsx
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Column 1</TableCell>
        <TableCell>Column 2</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.col1}</TableCell>
          <TableCell>{row.col2}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

### **Tab Navigation**

```jsx
const [tabValue, setTabValue] = useState(0);

<Paper>
  <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
    <Tab label="Tab 1" />
    <Tab label="Tab 2" />
  </Tabs>
</Paper>;

{
  tabValue === 0 && <div>Content 1</div>;
}
{
  tabValue === 1 && <div>Content 2</div>;
}
```

---

## 🔌 API Integration Template

```javascript
// src/services/api.js
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const apiService = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
```

**Usage in Redux Thunk:**

```javascript
export const fetchLoads = createAsyncThunk("loads/fetchLoads", async () => {
  return await apiService.get("/loads");
});
```

---

## 🐛 Debugging Tips

### **Redux DevTools**

```javascript
// Already configured in store
// Open browser DevTools → Redux tab
```

### **Console Logging**

```javascript
// In components
console.log('State:', state);
console.log('Props:', props);

// In Redux
.addCase(action.fulfilled, (state, action) => {
  console.log('Payload:', action.payload);
});
```

### **React DevTools**

- Install React DevTools extension
- Inspect component tree
- View props and state

---

## ⚙️ Environment Variables

Create `.env` file:

```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Logistics Platform
VITE_ENABLE_ANALYTICS=false
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📦 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Dependencies
npm install <package>    # Add package
npm update               # Update all packages
npm outdated             # Check outdated packages
```

---

## 🔍 Code Snippets

### **useEffect for API Calls**

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await apiService.get("/endpoint");
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchData();
}, []);
```

### **Redux useSelector & useDispatch**

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoads } from '../store/slices/loadsSlice';

const Component = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.loads);

  useEffect(() => {
    dispatch(fetchLoads());
  }, [dispatch]);

  return <div>{loading ? 'Loading...' : items.map(...)}</div>;
};
```

### **Protected Route Pattern**

```jsx
const ProtectedComponent = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <div>Protected Content</div>;
};
```

---

## 🎯 Best Practices

1. **Component Structure:**

   - One component per file
   - Use functional components
   - Extract reusable logic to custom hooks

2. **State Management:**

   - Use Redux for global state
   - Use local state for UI-only state
   - Normalize state shape

3. **Performance:**

   - Use `React.memo` for expensive components
   - Implement proper key props in lists
   - Code-split routes with lazy loading

4. **Naming Conventions:**

   - Components: PascalCase (`MyComponent.jsx`)
   - Files: camelCase (`myUtility.js`)
   - Constants: UPPER_CASE (`API_URL`)

5. **Code Organization:**
   - Group by feature, not by type
   - Keep components small and focused
   - Use barrel exports (index.js)

---

## 📚 Resources

- [Material-UI Docs](https://mui.com/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React Router Docs](https://reactrouter.com/)
- [Formik Docs](https://formik.org/)
- [Yup Validation](https://github.com/jquense/yup)

---

## 🆘 Troubleshooting

### **Issue: Module not found**

```bash
npm install
npm run dev
```

### **Issue: Port already in use**

```bash
# Change port in vite.config.js
export default defineConfig({
  server: { port: 3001 }
});
```

### **Issue: Redux state not updating**

- Check reducer logic
- Verify action dispatch
- Check Redux DevTools

### **Issue: Form validation not working**

- Verify Yup schema
- Check formik.touched and formik.errors
- Ensure onBlur events

---

## 🎓 Learning Path

1. ✅ Complete frontend setup
2. ⏭️ Integrate with backend API
3. ⏭️ Add real-time features (Socket.io)
4. ⏭️ Implement analytics
5. ⏭️ Add testing (Jest, React Testing Library)
6. ⏭️ Deploy to production

---

**Happy Coding! 🚀**

_For detailed information, see FRONTEND_COMPLETE_DOCUMENTATION.md_
