import ErrorBoundary from "./components/ErrorBoundary";
import CustomeRoutes from "./components/CustomRoutes";
import { ProvideAuth } from "./hooks/useAuth";

function App() {
  return (
    <div>
      <ErrorBoundary>
        <ProvideAuth>
          <CustomeRoutes />
        </ProvideAuth>
      </ErrorBoundary>
    </div>
  );
}

export default App;
