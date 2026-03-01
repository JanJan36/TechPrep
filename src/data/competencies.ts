export interface Competency {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  category: "core" | "common" | "basic";
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
}

export interface UserProgress {
  level: number;
  xp: number;
  xpToNext: number;
  title: string;
  lessonsCompleted: number;
  practicesDone: number;
  gamesPlayed: number;
  topicsExplored: number;
}

export const defaultProgress: UserProgress = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  title: "Newbie Technician",
  lessonsCompleted: 0,
  practicesDone: 0,
  gamesPlayed: 0,
  topicsExplored: 0,
};

export const competencies: Competency[] = [
  {
    id: "install-configure",
    title: "Install and Configure Computer Systems",
    description: "Assembling hardware, preparing installers, installing OS and software.",
    category: "core",
    topics: [
      { id: "assemble-hardware", title: "Assembling and Disassembling Hardware", description: "Learn to identify, assemble, and safely disassemble computer components.", completed: false, locked: false },
      { id: "bootable-devices", title: "Preparing Bootable Devices & Installers", description: "Create portable bootable USB drives and installation media.", completed: false, locked: false },
      { id: "install-os", title: "Installing Operating Systems & Drivers", description: "Install Windows and Linux operating systems with proper drivers.", completed: false, locked: false },
      { id: "install-apps", title: "Installing Applications & System Tests", description: "Install application software and conduct system tests.", completed: false, locked: false },
    ],
  },
  {
    id: "setup-networks",
    title: "Set Up Computer Networks",
    description: "Creating cables, configuring networks, routers, and wireless access points.",
    category: "core",
    topics: [
      { id: "network-cables", title: "Creating & Crimping Network Cables", description: "Create and crimp Ethernet cables with proper standards.", completed: false, locked: false },
      { id: "network-config", title: "Network Configuration (IP, Subnets)", description: "Set up IP addresses, subnets, and network settings.", completed: false, locked: false },
      { id: "routers-wifi", title: "Configuring Routers & Wi-Fi", description: "Configure routers, Wi-Fi, and wireless access points.", completed: false, locked: false },
      { id: "test-network", title: "Testing Network Connectivity", description: "Test and inspect network connectivity and troubleshoot issues.", completed: false, locked: false },
    ],
  },
  {
    id: "setup-servers",
    title: "Set Up Computer Servers",
    description: "User access, network services, and server deployment.",
    category: "core",
    topics: [
      { id: "active-directory", title: "User Access & Active Directory", description: "Set up user access and permissions using Active Directory.", completed: false, locked: false },
      { id: "network-services", title: "DHCP, DNS & File Server", description: "Configure DHCP, DNS, and File Server services.", completed: false, locked: false },
      { id: "server-testing", title: "Pre-deployment Testing & Docs", description: "Perform pre-deployment testing and documentation.", completed: false, locked: false },
    ],
  },
  {
    id: "maintain-repair",
    title: "Maintain and Repair Systems & Networks",
    description: "Diagnosing faults, repairing defects, and testing repaired systems.",
    category: "core",
    topics: [
      { id: "plan-maintenance", title: "Planning Maintenance & Repair", description: "Plan and prepare for maintenance and repair tasks.", completed: false, locked: false },
      { id: "diagnose-faults", title: "Diagnosing Hardware & Software Faults", description: "Identify and diagnose hardware and software issues.", completed: false, locked: false },
      { id: "rectify-defects", title: "Rectifying & Repairing Defects", description: "Repair defects in standalone systems and networks.", completed: false, locked: false },
      { id: "inspect-test", title: "Inspecting & Testing Repaired Systems", description: "Inspect and test repaired systems for quality assurance.", completed: false, locked: false },
    ],
  },
  {
    id: "quality-standards",
    title: "Apply Quality Standards",
    description: "Assessing the quality of materials and your own work.",
    category: "common",
    topics: [
      { id: "quality-assess", title: "Quality Assessment of Materials", description: "Evaluate materials and work output against quality standards.", completed: false, locked: false },
    ],
  },
  {
    id: "computer-operations",
    title: "Perform Computer Operations",
    description: "Basic data input, information access, and file management.",
    category: "common",
    topics: [
      { id: "data-input", title: "Data Input & File Management", description: "Perform basic data input, access information, and manage files.", completed: false, locked: false },
    ],
  },
  {
    id: "mensuration",
    title: "Perform Mensuration and Calculation",
    description: "Measuring dimensions, storage capacities, and electrical units.",
    category: "common",
    topics: [
      { id: "measurements", title: "Measurements & Calculations", description: "Measure dimensions, calculate storage capacities, and check electrical units.", completed: false, locked: false },
    ],
  },
  {
    id: "technical-drawings",
    title: "Prepare and Interpret Technical Drawings",
    description: "Reading schematics and diagrams for components and networks.",
    category: "common",
    topics: [
      { id: "schematics", title: "Reading Schematics & Diagrams", description: "Interpret technical drawings for components and network layouts.", completed: false, locked: false },
    ],
  },
  {
    id: "hand-tools",
    title: "Use Hand Tools",
    description: "Selecting and maintaining correct tools for the job.",
    category: "common",
    topics: [
      { id: "tool-selection", title: "Tool Selection & Maintenance", description: "Select and maintain screwdrivers, crimpers, multimeters, and more.", completed: false, locked: false },
    ],
  },
  {
    id: "electrical-wiring",
    title: "Terminate and Connect Electrical Wiring",
    description: "Handling internal and external connections safely.",
    category: "common",
    topics: [
      { id: "wiring-connections", title: "Wiring & Connections", description: "Handle internal and external electrical connections safely.", completed: false, locked: false },
    ],
  },
  {
    id: "test-components",
    title: "Test Electronic Components",
    description: "Using multimeters to check components and power outputs.",
    category: "common",
    topics: [
      { id: "multimeter-testing", title: "Multimeter Testing", description: "Use a multimeter to check capacitors, resistors, and power outputs.", completed: false, locked: false },
    ],
  },
  {
    id: "communication",
    title: "Workplace Communication",
    description: "Participating in meetings and conveying technical info.",
    category: "basic",
    topics: [
      { id: "tech-communication", title: "Technical Communication", description: "Participate in meetings and convey technical information effectively.", completed: false, locked: false },
    ],
  },
  {
    id: "teamwork",
    title: "Team Environment",
    description: "Working effectively with colleagues.",
    category: "basic",
    topics: [
      { id: "team-collab", title: "Team Collaboration", description: "Work effectively with colleagues and understand your role.", completed: false, locked: false },
    ],
  },
  {
    id: "professionalism",
    title: "Career Professionalism",
    description: "Managing work priorities and personal growth.",
    category: "basic",
    topics: [
      { id: "career-growth", title: "Work Priorities & Growth", description: "Manage work priorities and plan for personal growth.", completed: false, locked: false },
    ],
  },
  {
    id: "ohs",
    title: "Occupational Health and Safety",
    description: "Identifying and controlling workplace hazards.",
    category: "basic",
    topics: [
      { id: "hazard-control", title: "Hazard Identification & Control", description: "Identify and control hazards in the workplace.", completed: false, locked: false },
    ],
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    description: "Addressing workplace issues logically.",
    category: "basic",
    topics: [
      { id: "logical-solving", title: "Logical Problem Solving", description: "Address general workplace issues using logical approaches.", completed: false, locked: false },
    ],
  },
  {
    id: "innovation",
    title: "Innovation",
    description: "Contributing to improvements in workplace workflow.",
    category: "basic",
    topics: [
      { id: "workflow-improvement", title: "Workflow Improvements", description: "Contribute to improvements in workplace processes and workflow.", completed: false, locked: false },
    ],
  },
];
