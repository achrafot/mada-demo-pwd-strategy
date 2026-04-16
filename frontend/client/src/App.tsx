import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PillarPage from "./pages/PillarPage";
import ActionPlan from "./pages/ActionPlan";
import StrategicOutcomes from "./pages/StrategicOutcomes";
import Dashboard from "./pages/Dashboard";

function Router() {
  return (
    <WouterRouter base="/pwd-strategy">
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/pillar/:id"} component={PillarPage} />
        <Route path={"/action-plan"} component={ActionPlan} />
        <Route path={"/outcomes"} component={StrategicOutcomes} />
        <Route path={"/dashboard"} component={Dashboard} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
