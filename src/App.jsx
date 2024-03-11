import './App.css'
import RootLayout from "./components/layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ScorersPage from "./pages/ScorersPage";
import PlayerPage from "./pages/PlayerPage";
import TeamPage from "./pages/TeamPage";
import StarterPage from "./pages/StarterPage";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "team/:teamId?", element: <TeamPage /> },
      { path: "scorers", element: <ScorersPage /> },
      { path: "player/:playerName?", element: <PlayerPage /> },
      // { path: "products/:productId", element: <ProductDetailPage /> },
    ],
  }, {
    path: "/starter",
    element: <StarterPage />,
    errorElement: <ErrorPage />
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
