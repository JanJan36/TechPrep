import { lazy, Suspense } from "react";

const AnimatedPCAssembly = lazy(() => import("./AnimatedPCAssembly"));
const AnimatedCableCrimping = lazy(() => import("./AnimatedCableCrimping"));
const AnimatedNetworkFlow = lazy(() => import("./AnimatedNetworkFlow"));
const AnimatedSubnetVisual = lazy(() => import("./AnimatedSubnetVisual"));
const AnimatedOSInstall = lazy(() => import("./AnimatedOSInstall"));
const AnimatedMultimeter = lazy(() => import("./AnimatedMultimeter"));
const AnimatedHazardPyramid = lazy(() => import("./AnimatedHazardPyramid"));
const AnimatedBootableDevice = lazy(() => import("./AnimatedBootableDevice"));
const AnimatedAppInstall = lazy(() => import("./AnimatedAppInstall"));
const AnimatedServerTesting = lazy(() => import("./AnimatedServerTesting"));
const AnimatedMaintenancePlan = lazy(() => import("./AnimatedMaintenancePlan"));
const AnimatedRepairFlow = lazy(() => import("./AnimatedRepairFlow"));
const AnimatedSystemInspect = lazy(() => import("./AnimatedSystemInspect"));
const AnimatedQualityCheck = lazy(() => import("./AnimatedQualityCheck"));
const AnimatedDataInput = lazy(() => import("./AnimatedDataInput"));
const AnimatedMeasurements = lazy(() => import("./AnimatedMeasurements"));
const AnimatedSchematic = lazy(() => import("./AnimatedSchematic"));
const AnimatedToolSelection = lazy(() => import("./AnimatedToolSelection"));
const AnimatedCommunication = lazy(() => import("./AnimatedCommunication"));
const AnimatedTeamwork = lazy(() => import("./AnimatedTeamwork"));
const AnimatedCareerGrowth = lazy(() => import("./AnimatedCareerGrowth"));

// Maps topic IDs to their animated visual components
const animationMap: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "assemble-hardware": AnimatedPCAssembly,
  "network-cables": AnimatedCableCrimping,
  "network-config": AnimatedSubnetVisual,
  "routers-wifi": AnimatedNetworkFlow,
  "test-network": AnimatedNetworkFlow,
  "install-os": AnimatedOSInstall,
  "multimeter-testing": AnimatedMultimeter,
  "hazard-control": AnimatedHazardPyramid,
  "wiring-connections": AnimatedCableCrimping,
  "active-directory": AnimatedNetworkFlow,
  "network-services": AnimatedNetworkFlow,
  "diagnose-faults": AnimatedMultimeter,
  // New mappings
  "bootable-devices": AnimatedBootableDevice,
  "install-apps": AnimatedAppInstall,
  "server-testing": AnimatedServerTesting,
  "plan-maintenance": AnimatedMaintenancePlan,
  "rectify-defects": AnimatedRepairFlow,
  "inspect-test": AnimatedSystemInspect,
  "quality-assess": AnimatedQualityCheck,
  "data-input": AnimatedDataInput,
  "measurements": AnimatedMeasurements,
  "schematics": AnimatedSchematic,
  "tool-selection": AnimatedToolSelection,
  "tech-communication": AnimatedCommunication,
  "team-collab": AnimatedTeamwork,
  "career-growth": AnimatedCareerGrowth,
};

export const getAnimationForTopic = (topicId: string): React.LazyExoticComponent<React.ComponentType> | null => {
  return animationMap[topicId] || null;
};

export const AnimatedDiagram = ({ topicId }: { topicId: string }) => {
  const Component = animationMap[topicId];
  if (!Component) return null;

  return (
    <Suspense fallback={
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="animate-pulse text-muted-foreground text-sm">Loading animation...</div>
      </div>
    }>
      <Component />
    </Suspense>
  );
};
