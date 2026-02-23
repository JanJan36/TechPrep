import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { lazy, Suspense } from "react";

const PCAssemblySimulation = lazy(() => import("@/components/practice/PCAssemblySimulation"));
const CableCrimpingSimulation = lazy(() => import("@/components/practice/CableCrimpingSimulation"));
const NetworkConfigSimulation = lazy(() => import("@/components/practice/NetworkConfigSimulation"));
const TroubleshootingSimulation = lazy(() => import("@/components/practice/TroubleshootingSimulation"));
const OSInstallSimulation = lazy(() => import("@/components/practice/OSInstallSimulation"));

const simulationMap: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  "pc-assembly": PCAssemblySimulation,
  "cable-crimping": CableCrimpingSimulation,
  "network-config": NetworkConfigSimulation,
  "troubleshooting": TroubleshootingSimulation,
  "os-install": OSInstallSimulation,
};

const PracticeSimulationPage = () => {
  const { simId } = useParams<{ simId: string }>();
  const navigate = useNavigate();

  const SimComponent = simId ? simulationMap[simId] : null;

  return (
    <div>
      <div className="px-4 pt-4">
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => navigate("/practice")}
            className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Practice
          </button>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        }
      >
        {SimComponent ? <SimComponent /> : (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
            <p className="font-display text-xl font-bold text-foreground">Simulation Not Found</p>
            <p className="text-sm text-muted-foreground mt-2">This practice simulation doesn't exist yet.</p>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default PracticeSimulationPage;
