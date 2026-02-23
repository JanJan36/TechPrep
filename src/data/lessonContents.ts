export interface LessonSection {
  type: "text" | "image" | "callout" | "list";
  content?: string;
  imagePrompt?: string;
  items?: string[];
  variant?: "info" | "warning" | "tip";
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  topicId: string;
  title: string;
  xpReward: number;
  estimatedMinutes: number;
  sections: LessonSection[];
  quiz: QuizQuestion[];
}

export const lessonContents: Record<string, LessonContent> = {
  // ─── CORE: Install & Configure ───
  "assemble-hardware": {
    topicId: "assemble-hardware",
    title: "Assembling and Disassembling Hardware",
    xpReward: 25,
    estimatedMinutes: 15,
    sections: [
      { type: "text", content: "Computer hardware assembly is the foundation of computer system servicing. Understanding how each component fits together—and how to safely take them apart—is essential for any technician." },
      { type: "callout", content: "Always ground yourself with an anti-static wrist strap before handling components to prevent electrostatic discharge (ESD) damage.", variant: "warning" },
      { type: "text", content: "## Key Components\n\nA desktop computer system is made up of several core components that work together:" },
      { type: "list", items: [
        "**Motherboard** — The main circuit board that connects all components",
        "**CPU (Processor)** — The brain of the computer that executes instructions",
        "**RAM (Memory)** — Temporary storage for active programs and data",
        "**Storage Drive** — HDD or SSD for permanent data storage",
        "**Power Supply Unit (PSU)** — Converts AC power to DC for components",
        "**GPU (Graphics Card)** — Handles visual output (dedicated or integrated)",
        "**Case** — The enclosure that houses and protects all parts",
      ]},
      { type: "text", content: "## Assembly Order\n\nFollow this recommended order for assembling a desktop PC:\n\n1. **Install the CPU** onto the motherboard (align the triangle marker)\n2. **Mount the CPU cooler** with thermal paste applied\n3. **Insert RAM sticks** into the correct DIMM slots\n4. **Install the motherboard** into the case using standoffs\n5. **Mount storage drives** (SSD/HDD) in drive bays\n6. **Install the PSU** and route cables\n7. **Connect power cables** (24-pin ATX, 8-pin CPU, SATA)\n8. **Install the GPU** into the PCIe x16 slot\n9. **Connect front panel headers** (power button, USB, audio)\n10. **Cable management** and final inspection" },
      { type: "callout", content: "When disassembling, reverse the order. Always document cable connections with photos before disconnecting them.", variant: "tip" },
      { type: "text", content: "## Safety Precautions\n\nProper safety practices prevent damage to both you and the equipment:\n\n- Work on a clean, flat, non-conductive surface\n- Use an anti-static mat and wrist strap\n- Never force components—if it doesn't fit, check alignment\n- Keep screws organized (magnetic trays help)\n- Disconnect power before any internal work" },
    ],
    quiz: [
      { question: "What should you always wear before handling internal computer components?", options: ["Safety goggles", "Anti-static wrist strap", "Rubber gloves", "Lab coat"], correctIndex: 1, explanation: "An anti-static wrist strap prevents electrostatic discharge (ESD) which can damage sensitive electronic components." },
      { question: "What is the correct first step when assembling a desktop PC?", options: ["Install the GPU", "Mount the PSU", "Install the CPU on the motherboard", "Connect front panel headers"], correctIndex: 2, explanation: "The CPU should be installed on the motherboard first, before the board is mounted in the case, as it's easier to access." },
      { question: "Which component is the main circuit board that connects all other parts?", options: ["CPU", "PSU", "RAM", "Motherboard"], correctIndex: 3, explanation: "The motherboard is the main PCB that provides connections between the CPU, RAM, storage, and all other components." },
      { question: "What should you apply between the CPU and its cooler?", options: ["Super glue", "Thermal paste", "Electrical tape", "Silicone sealant"], correctIndex: 1, explanation: "Thermal paste fills microscopic gaps between the CPU and cooler to improve heat transfer." },
      { question: "When disassembling a computer, what should you do FIRST?", options: ["Remove the GPU", "Take photos of cable connections", "Remove the motherboard", "Unscrew the case"], correctIndex: 1, explanation: "Documenting cable connections with photos before disconnecting ensures you can reassemble correctly." },
    ],
  },
  "bootable-devices": {
    topicId: "bootable-devices",
    title: "Preparing Bootable Devices & Installers",
    xpReward: 20,
    estimatedMinutes: 12,
    sections: [
      { type: "text", content: "A bootable device allows a computer to start up from external media instead of its internal drive. This is essential for installing operating systems, running diagnostics, or recovering data." },
      { type: "text", content: "## Types of Bootable Media\n\n- **USB Flash Drive** — Most common; fast and reusable\n- **DVD/CD** — Legacy method, still used in some environments\n- **Network Boot (PXE)** — Boot from a network server; used in enterprise deployments" },
      { type: "text", content: "## Creating a Bootable USB\n\nTools commonly used:\n\n1. **Rufus** (Windows) — Most popular, supports UEFI and Legacy\n2. **Etcher/balenaEtcher** — Cross-platform, simple drag-and-drop\n3. **Windows Media Creation Tool** — Official Microsoft tool for Windows ISOs\n4. **dd command** (Linux) — Command-line tool for writing disk images" },
      { type: "callout", content: "Always verify the ISO file integrity by checking its SHA256 hash before creating bootable media. Corrupted ISOs lead to failed installations.", variant: "warning" },
      { type: "list", items: [
        "Download the official ISO image from the OS vendor",
        "Insert a USB drive (8GB minimum recommended)",
        "Open your bootable media creation tool",
        "Select the ISO file and target USB drive",
        "Choose the partition scheme (GPT for UEFI, MBR for Legacy BIOS)",
        "Start the process and wait for completion",
        "Safely eject the USB drive",
      ]},
      { type: "callout", content: "UEFI systems require GPT partition tables. If the target PC uses Legacy BIOS, select MBR instead.", variant: "tip" },
    ],
    quiz: [
      { question: "What is the minimum recommended USB drive size for creating bootable media?", options: ["2GB", "4GB", "8GB", "16GB"], correctIndex: 2, explanation: "8GB is the minimum recommended size to accommodate most modern OS installation images." },
      { question: "Which tool is the most popular for creating bootable USB drives on Windows?", options: ["Etcher", "Rufus", "dd", "DiskPart"], correctIndex: 1, explanation: "Rufus is the most widely used tool on Windows, supporting both UEFI and Legacy boot modes." },
      { question: "What partition scheme should you use for a UEFI system?", options: ["MBR", "FAT32", "GPT", "NTFS"], correctIndex: 2, explanation: "GPT (GUID Partition Table) is required for UEFI boot mode, while MBR is used for Legacy BIOS." },
      { question: "Why should you verify the SHA256 hash of an ISO file?", options: ["To check file size", "To ensure the file isn't corrupted", "To speed up the download", "To compress the file"], correctIndex: 1, explanation: "Verifying the hash ensures the ISO file is complete and hasn't been corrupted or tampered with." },
    ],
  },
  "install-os": {
    topicId: "install-os",
    title: "Installing Operating Systems & Drivers",
    xpReward: 30,
    estimatedMinutes: 20,
    sections: [
      { type: "text", content: "Installing an operating system is one of the most fundamental tasks for a computer technician. You must understand the process for both Windows and Linux systems." },
      { type: "text", content: "## Pre-Installation Checklist\n\nBefore installing an OS, verify:\n\n1. Hardware meets minimum system requirements\n2. BIOS/UEFI settings are configured correctly\n3. Boot order is set to boot from installation media\n4. Important data is backed up\n5. Product key or license is available (Windows)" },
      { type: "text", content: "## Windows Installation Steps\n\n1. Boot from USB/DVD installer\n2. Select language, time, and keyboard layout\n3. Click \"Install Now\"\n4. Enter product key (or skip for later)\n5. Accept license terms\n6. Choose \"Custom\" for clean install\n7. Partition the drive (delete old partitions if needed)\n8. Select the partition and click Next\n9. Wait for installation to complete\n10. Set up user account and preferences" },
      { type: "text", content: "## Linux Installation (Ubuntu)\n\n1. Boot from USB with Ubuntu ISO\n2. Select \"Install Ubuntu\"\n3. Choose language and keyboard\n4. Select installation type (Normal or Minimal)\n5. Choose \"Erase disk\" or manual partitioning\n6. Set timezone and create user account\n7. Wait for installation to complete\n8. Reboot and remove installation media" },
      { type: "callout", content: "Always install chipset and network drivers first after OS installation. Without network drivers, you can't download other updates.", variant: "tip" },
      { type: "text", content: "## Installing Drivers\n\nAfter OS installation, install drivers in this order:\n\n1. **Chipset drivers** — Motherboard communication\n2. **Network drivers** — Ethernet and Wi-Fi\n3. **Graphics drivers** — GPU (NVIDIA, AMD, or Intel)\n4. **Audio drivers** — Sound card\n5. **Peripheral drivers** — Printers, scanners, etc." },
    ],
    quiz: [
      { question: "What should you verify BEFORE installing an operating system?", options: ["Social media accounts", "Hardware meets minimum requirements", "Game compatibility", "Monitor brightness"], correctIndex: 1, explanation: "Verifying hardware meets minimum system requirements ensures the OS will run properly." },
      { question: "Which drivers should be installed FIRST after OS installation?", options: ["Audio drivers", "Graphics drivers", "Chipset drivers", "Printer drivers"], correctIndex: 2, explanation: "Chipset drivers enable proper communication between the motherboard and other components, so they should be installed first." },
      { question: "What does 'Custom' installation mean in Windows setup?", options: ["Upgrade from existing OS", "Clean install on formatted drive", "Network installation", "Repair installation"], correctIndex: 1, explanation: "Custom installation performs a clean install, allowing you to format the drive and start fresh." },
    ],
  },
  "install-apps": {
    topicId: "install-apps",
    title: "Installing Applications & System Tests",
    xpReward: 20,
    estimatedMinutes: 10,
    sections: [
      { type: "text", content: "After installing the OS and drivers, a technician needs to install required application software and verify the system works correctly through comprehensive testing." },
      { type: "text", content: "## Application Installation Best Practices\n\n- Always download from official sources or trusted repositories\n- Use package managers when available (apt, winget, chocolatey)\n- Install applications in the correct order (dependencies first)\n- Avoid installing unnecessary bloatware\n- Configure default applications for common file types" },
      { type: "list", items: [
        "**Productivity** — Microsoft Office, LibreOffice, Google Workspace",
        "**Browser** — Chrome, Firefox, Edge",
        "**Security** — Antivirus, firewall configuration",
        "**Utilities** — 7-Zip, PDF reader, media player",
        "**Communication** — Email client, messaging apps",
        "**Specialized** — Industry-specific software as needed",
      ]},
      { type: "text", content: "## System Testing\n\nAfter setup, perform these tests:\n\n1. **Boot test** — System starts without errors\n2. **Hardware diagnostics** — CPU, RAM, and storage tests\n3. **Network test** — Internet and LAN connectivity\n4. **Peripheral test** — All ports, USB, audio, display outputs\n5. **Software test** — All installed apps launch correctly\n6. **Stress test** — Run under load to check stability" },
      { type: "callout", content: "Document all installed software, versions, and license keys in a system configuration sheet for future reference.", variant: "tip" },
    ],
    quiz: [
      { question: "What is a package manager?", options: ["A shipping service", "A tool that automates software installation", "A type of antivirus", "A file compression tool"], correctIndex: 1, explanation: "Package managers like apt, winget, and chocolatey automate the process of installing, updating, and removing software." },
      { question: "What should you do after installing all software?", options: ["Shut down immediately", "Run system tests", "Delete the installer files", "Change the wallpaper"], correctIndex: 1, explanation: "System tests verify that all hardware and software work correctly before handing the system to the user." },
      { question: "Where should you always download applications from?", options: ["Any website", "Torrent sites", "Official sources or trusted repositories", "Social media links"], correctIndex: 2, explanation: "Official sources ensure you get legitimate, malware-free software." },
    ],
  },

  // ─── CORE: Set Up Networks ───
  "network-cables": {
    topicId: "network-cables",
    title: "Creating & Crimping Network Cables",
    xpReward: 25,
    estimatedMinutes: 15,
    sections: [
      { type: "text", content: "Network cables are the physical backbone of wired networks. A computer technician must know how to create, terminate, and test Ethernet cables." },
      { type: "text", content: "## Types of Ethernet Cables\n\n- **Cat5e** — Up to 1 Gbps, 100m max length\n- **Cat6** — Up to 10 Gbps (55m), better shielding\n- **Cat6a** — Up to 10 Gbps (100m), augmented shielding\n- **Cat7** — Up to 10 Gbps, fully shielded pairs" },
      { type: "text", content: "## Wiring Standards\n\nTwo standard wiring patterns are used:\n\n### T568A\n1. White/Green\n2. Green\n3. White/Orange\n4. Blue\n5. White/Blue\n6. Orange\n7. White/Brown\n8. Brown\n\n### T568B (Most Common)\n1. White/Orange\n2. Orange\n3. White/Green\n4. Blue\n5. White/Blue\n6. Green\n7. White/Brown\n8. Brown" },
      { type: "callout", content: "**Straight-through cable**: Same standard on both ends (T568B-T568B). Used for connecting different devices (PC to switch).\n\n**Crossover cable**: Different standards on each end (T568A-T568B). Used for connecting similar devices (PC to PC).", variant: "info" },
      { type: "text", content: "## Crimping Process\n\n1. Strip about 2 inches of the outer jacket\n2. Untwist and arrange wires in the correct order\n3. Trim wires evenly to about 0.5 inches\n4. Insert wires into the RJ-45 connector (copper pins facing up)\n5. Ensure all wires reach the end of the connector\n6. Crimp firmly with an RJ-45 crimping tool\n7. Test with a cable tester" },
    ],
    quiz: [
      { question: "Which wiring standard is most commonly used?", options: ["T568A", "T568B", "T568C", "T568D"], correctIndex: 1, explanation: "T568B is the most widely used wiring standard in commercial installations." },
      { question: "What type of cable connects a PC directly to a switch?", options: ["Crossover", "Straight-through", "Rollover", "Coaxial"], correctIndex: 1, explanation: "Straight-through cables use the same wiring standard on both ends and connect different types of devices." },
      { question: "What is the maximum length for a Cat5e Ethernet cable?", options: ["50 meters", "75 meters", "100 meters", "200 meters"], correctIndex: 2, explanation: "The maximum recommended length for a Cat5e cable run is 100 meters (328 feet)." },
      { question: "What tool is used to attach an RJ-45 connector to a cable?", options: ["Wire stripper", "Soldering iron", "Crimping tool", "Multimeter"], correctIndex: 2, explanation: "An RJ-45 crimping tool presses the connector's metal contacts into the wire conductors to make a secure connection." },
    ],
  },
  "network-config": {
    topicId: "network-config",
    title: "Network Configuration (IP, Subnets)",
    xpReward: 30,
    estimatedMinutes: 18,
    sections: [
      { type: "text", content: "Network configuration involves assigning IP addresses, subnet masks, and gateways to devices so they can communicate on a network." },
      { type: "text", content: "## IP Addressing Basics\n\nAn IP address is a unique identifier for a device on a network. IPv4 addresses consist of four octets (e.g., 192.168.1.100).\n\n### Private IP Ranges\n- **Class A**: 10.0.0.0 – 10.255.255.255\n- **Class B**: 172.16.0.0 – 172.31.255.255\n- **Class C**: 192.168.0.0 – 192.168.255.255" },
      { type: "text", content: "## Subnet Masks\n\nSubnet masks determine which portion of an IP address identifies the network vs. the host:\n\n- **/24 (255.255.255.0)** — 254 usable hosts\n- **/16 (255.255.0.0)** — 65,534 usable hosts\n- **/8 (255.0.0.0)** — 16,777,214 usable hosts" },
      { type: "callout", content: "The default gateway is typically the router's IP address (e.g., 192.168.1.1). Without it, devices cannot reach networks outside their subnet.", variant: "info" },
      { type: "text", content: "## Configuring Static IP (Windows)\n\n1. Open Network & Internet Settings\n2. Click 'Change adapter options'\n3. Right-click adapter → Properties\n4. Select 'Internet Protocol Version 4 (TCP/IPv4)'\n5. Enter IP address, Subnet mask, Default gateway\n6. Enter DNS server addresses\n7. Click OK and close" },
    ],
    quiz: [
      { question: "Which IP range is a Class C private address?", options: ["10.0.0.0", "172.16.0.0", "192.168.0.0", "224.0.0.0"], correctIndex: 2, explanation: "192.168.0.0 – 192.168.255.255 is the Class C private IP range, commonly used in home and small office networks." },
      { question: "How many usable hosts does a /24 subnet provide?", options: ["256", "254", "255", "128"], correctIndex: 1, explanation: "A /24 subnet has 256 addresses, but 2 are reserved (network address and broadcast), leaving 254 usable host addresses." },
      { question: "What is the default gateway typically?", options: ["DNS server", "The router's IP address", "The subnet mask", "The MAC address"], correctIndex: 1, explanation: "The default gateway is the router's IP address, which forwards traffic to other networks." },
    ],
  },
  "routers-wifi": {
    topicId: "routers-wifi",
    title: "Configuring Routers & Wi-Fi",
    xpReward: 30,
    estimatedMinutes: 18,
    sections: [
      { type: "text", content: "Routers are the heart of any network, directing traffic between the local network and the internet. Configuring them correctly ensures security and performance." },
      { type: "text", content: "## Accessing the Router\n\nMost routers use a web-based admin panel:\n\n1. Connect to the router via Ethernet or default Wi-Fi\n2. Open a browser and navigate to the gateway IP (commonly 192.168.1.1 or 192.168.0.1)\n3. Log in with default credentials (check the router label)\n4. **Change the default password immediately**" },
      { type: "callout", content: "Never leave the default admin password on a router. It's one of the most common security vulnerabilities in networks.", variant: "warning" },
      { type: "text", content: "## Essential Router Settings\n\n- **SSID (Network Name)** — Choose a unique, non-identifiable name\n- **Security Mode** — Always use WPA3 or WPA2-PSK (AES)\n- **Wi-Fi Password** — Use a strong passphrase (12+ characters)\n- **Channel Selection** — Auto or manually pick a less congested channel\n- **Band Selection** — 2.4 GHz (range) vs 5 GHz (speed)\n- **DHCP Range** — Define the pool of auto-assigned IPs\n- **Firmware Update** — Check and install the latest firmware" },
      { type: "text", content: "## Wireless Access Points (WAPs)\n\nIn larger spaces, a single router may not provide full coverage:\n\n- **Access Points** extend Wi-Fi coverage using the same network\n- Place WAPs centrally and away from interference (microwaves, metal)\n- Use the same SSID and security settings for seamless roaming\n- Use different channels on each WAP to avoid interference\n- Consider PoE (Power over Ethernet) for easy deployment" },
      { type: "list", items: [
        "**WPA3** — Latest, most secure wireless encryption",
        "**WPA2-PSK (AES)** — Widely supported, strong security",
        "**WEP** — Obsolete and easily cracked; never use",
        "**MAC Filtering** — Additional layer; not a replacement for encryption",
        "**Guest Network** — Isolates visitors from your main network",
      ]},
      { type: "callout", content: "For enterprise environments, use WPA2/WPA3-Enterprise with a RADIUS server for individual user authentication instead of a shared password.", variant: "tip" },
    ],
    quiz: [
      { question: "What is the first thing you should do after accessing a router's admin panel?", options: ["Change the SSID", "Update firmware", "Change the default password", "Set up Wi-Fi"], correctIndex: 2, explanation: "Changing the default admin password is critical to prevent unauthorized access to your router settings." },
      { question: "Which wireless security protocol should you NEVER use?", options: ["WPA3", "WPA2-PSK", "WEP", "WPA2-Enterprise"], correctIndex: 2, explanation: "WEP is outdated and can be cracked in minutes. Always use WPA2 or WPA3." },
      { question: "What is the advantage of the 5 GHz band over 2.4 GHz?", options: ["Better range", "Faster speeds", "Lower cost", "More interference"], correctIndex: 1, explanation: "5 GHz provides faster data speeds but has shorter range compared to 2.4 GHz." },
      { question: "Why should you use different channels on multiple access points?", options: ["To save power", "To avoid interference between them", "To increase security", "To reduce cost"], correctIndex: 1, explanation: "Using different channels prevents wireless access points from interfering with each other, improving overall performance." },
    ],
  },
  "test-network": {
    topicId: "test-network",
    title: "Testing Network Connectivity",
    xpReward: 25,
    estimatedMinutes: 14,
    sections: [
      { type: "text", content: "After setting up a network, thorough testing ensures everything works correctly. A technician must know the essential diagnostic tools and procedures." },
      { type: "text", content: "## Essential Network Commands\n\n### ping\nTests connectivity to a host by sending ICMP packets:\n- `ping 192.168.1.1` — Test local gateway\n- `ping google.com` — Test internet connectivity\n- `ping -t` — Continuous ping (Windows)\n\n### ipconfig / ifconfig\nDisplays current network configuration:\n- `ipconfig /all` — Detailed Windows config\n- `ifconfig` or `ip addr` — Linux equivalent\n- `ipconfig /release` and `/renew` — Refresh DHCP lease\n\n### tracert / traceroute\nShows the path packets take to a destination:\n- `tracert google.com` — Windows\n- `traceroute google.com` — Linux\n\n### nslookup\nQueries DNS servers:\n- `nslookup google.com` — Resolve domain to IP\n- Useful for diagnosing DNS issues" },
      { type: "callout", content: "If ping works for IP addresses but fails for domain names, the issue is DNS—not connectivity. Check your DNS server settings.", variant: "tip" },
      { type: "text", content: "## Cable Testing\n\nPhysical cable issues are common:\n\n1. Use a **cable tester** to verify all 8 wires have continuity\n2. Check for **crossover** vs **straight-through** wiring\n3. Look for **bent or broken pins** in RJ-45 connectors\n4. Verify cables are **firmly seated** in ports\n5. Check cable **length** (max 100m for Ethernet)" },
      { type: "text", content: "## Systematic Troubleshooting\n\nFollow the OSI model bottom-up:\n\n1. **Physical** — Check cables, ports, and link lights\n2. **Data Link** — Verify MAC addresses and switch ports\n3. **Network** — Check IP configuration and routing\n4. **Transport** — Test specific ports and services\n5. **Application** — Verify the service itself is running" },
    ],
    quiz: [
      { question: "Which command tests basic connectivity to another device?", options: ["tracert", "nslookup", "ping", "netstat"], correctIndex: 2, explanation: "The ping command sends ICMP echo requests to test whether a device is reachable on the network." },
      { question: "If ping works by IP but not by domain name, what is the likely issue?", options: ["Firewall", "DNS configuration", "Cable fault", "IP conflict"], correctIndex: 1, explanation: "If IP-based communication works but name resolution fails, the DNS server settings are likely incorrect." },
      { question: "What is the maximum recommended Ethernet cable length?", options: ["50 meters", "75 meters", "100 meters", "150 meters"], correctIndex: 2, explanation: "The maximum recommended length for an Ethernet cable run is 100 meters (328 feet) to maintain signal quality." },
      { question: "Which troubleshooting approach starts from physical connections?", options: ["Top-down", "Bottom-up (OSI model)", "Random", "Application-first"], correctIndex: 1, explanation: "The bottom-up approach follows the OSI model, starting with physical layer checks before moving to higher layers." },
    ],
  },

  // ─── CORE: Set Up Servers ───
  "active-directory": {
    topicId: "active-directory",
    title: "User Access & Active Directory",
    xpReward: 30,
    estimatedMinutes: 18,
    sections: [
      { type: "text", content: "Active Directory (AD) is Microsoft's directory service for managing users, computers, and resources in a Windows Server environment. It is the backbone of enterprise identity management." },
      { type: "text", content: "## Key Concepts\n\n- **Domain** — A logical grouping of network objects (users, computers) sharing the same AD database\n- **Domain Controller (DC)** — A server running AD that authenticates users and enforces policies\n- **Organizational Unit (OU)** — A container for organizing users, groups, and computers\n- **Group Policy (GPO)** — Rules applied to users/computers (password policies, software restrictions)" },
      { type: "callout", content: "Always create at least two domain controllers for redundancy. If the primary DC fails, the secondary can continue authentication services.", variant: "warning" },
      { type: "text", content: "## Setting Up Users and Groups\n\n1. Open **Active Directory Users and Computers** (ADUC)\n2. Create **Organizational Units** for departments (e.g., IT, HR, Finance)\n3. Create **user accounts** with proper naming conventions (e.g., jdoe)\n4. Create **security groups** for resource access (e.g., HR_ReadOnly)\n5. Add users to the appropriate groups\n6. Set **password policies** (complexity, expiration, lockout)" },
      { type: "text", content: "## NTFS Permissions\n\nControl access to files and folders:\n\n- **Full Control** — Read, write, modify, delete, change permissions\n- **Modify** — Read, write, delete files and subfolders\n- **Read & Execute** — View and run files\n- **Read** — View files only\n- **Write** — Create new files\n\nBest practice: Assign permissions to **groups**, not individual users." },
      { type: "callout", content: "Follow the principle of least privilege — give users only the minimum permissions they need to do their job.", variant: "tip" },
    ],
    quiz: [
      { question: "What is a Domain Controller?", options: ["A firewall device", "A server running Active Directory for authentication", "A network switch", "A DNS server only"], correctIndex: 1, explanation: "A Domain Controller runs Active Directory and handles user authentication and security policy enforcement." },
      { question: "What is the principle of least privilege?", options: ["Give everyone admin access", "Give users only the minimum permissions needed", "Remove all permissions", "Use only guest accounts"], correctIndex: 1, explanation: "Least privilege means granting only the access necessary for a user to perform their specific job duties." },
      { question: "How should you assign file permissions in an enterprise?", options: ["To individual users", "To security groups", "To everyone", "By email"], correctIndex: 1, explanation: "Assigning permissions to groups makes management easier and more consistent than individual user assignments." },
      { question: "Why should you have at least two domain controllers?", options: ["For faster internet", "For redundancy in case one fails", "To use more electricity", "For printer sharing"], correctIndex: 1, explanation: "Redundant DCs ensure authentication services continue if the primary controller fails." },
    ],
  },
  "network-services": {
    topicId: "network-services",
    title: "DHCP, DNS & File Server",
    xpReward: 30,
    estimatedMinutes: 20,
    sections: [
      { type: "text", content: "Network services like DHCP, DNS, and File Servers are essential infrastructure components that every server administrator must understand and configure." },
      { type: "text", content: "## DHCP (Dynamic Host Configuration Protocol)\n\nDHCP automatically assigns IP addresses to devices on the network.\n\n### Configuration Steps:\n1. Install the DHCP Server role in Server Manager\n2. Create a new **scope** (range of IPs to assign)\n3. Define the **subnet mask**, **default gateway**, and **DNS servers**\n4. Set **lease duration** (how long an IP is reserved)\n5. Add **exclusions** for static IPs (servers, printers)\n6. **Authorize** the DHCP server in Active Directory\n7. Activate the scope" },
      { type: "callout", content: "Never run two unauthorized DHCP servers on the same network — this causes IP conflicts and connectivity issues (rogue DHCP).", variant: "warning" },
      { type: "text", content: "## DNS (Domain Name System)\n\nDNS translates domain names to IP addresses.\n\n### Key Record Types:\n- **A Record** — Maps a hostname to an IPv4 address\n- **AAAA Record** — Maps to an IPv6 address\n- **CNAME** — Alias for another domain name\n- **MX Record** — Mail server for the domain\n- **PTR Record** — Reverse lookup (IP to hostname)" },
      { type: "text", content: "## File Server\n\nA File Server provides centralized storage and file sharing:\n\n1. Install the **File and Storage Services** role\n2. Create **shared folders** with descriptive names\n3. Set **NTFS permissions** for security groups\n4. Set **share permissions** (usually allow Full Control, then restrict via NTFS)\n5. Map network drives via Group Policy for easy user access\n6. Enable **Shadow Copies** for file version recovery" },
      { type: "callout", content: "Use DFS (Distributed File System) for organizations with multiple file servers. It provides a single namespace for users regardless of the actual server location.", variant: "tip" },
    ],
    quiz: [
      { question: "What does DHCP automatically assign to devices?", options: ["MAC addresses", "IP addresses", "Domain names", "Passwords"], correctIndex: 1, explanation: "DHCP automatically assigns IP addresses (plus subnet mask, gateway, and DNS) to devices on the network." },
      { question: "What DNS record type maps a hostname to an IPv4 address?", options: ["MX", "CNAME", "A Record", "PTR"], correctIndex: 2, explanation: "An A Record (Address Record) maps a hostname to its corresponding IPv4 address." },
      { question: "What is a DHCP scope?", options: ["A security policy", "A range of IP addresses to assign", "A type of cable", "A firewall rule"], correctIndex: 1, explanation: "A DHCP scope defines the range of IP addresses that the DHCP server can assign to clients." },
      { question: "Why should you enable Shadow Copies on a file server?", options: ["To encrypt files", "To allow recovery of previous file versions", "To compress files", "To delete old files"], correctIndex: 1, explanation: "Shadow Copies maintain previous versions of files, allowing users to recover accidentally deleted or modified files." },
    ],
  },
  "server-testing": {
    topicId: "server-testing",
    title: "Pre-deployment Testing & Documentation",
    xpReward: 25,
    estimatedMinutes: 14,
    sections: [
      { type: "text", content: "Before deploying a server into a production environment, thorough testing and documentation ensures reliability and makes future troubleshooting easier." },
      { type: "text", content: "## Pre-deployment Testing Checklist\n\n1. **Network Connectivity** — Verify the server can reach all required networks\n2. **Service Availability** — Confirm all roles and services are running\n3. **Authentication** — Test user login from client machines\n4. **DNS Resolution** — Verify forward and reverse lookups\n5. **DHCP Leases** — Confirm clients receive correct IP configurations\n6. **File Sharing** — Test read/write access with proper permissions\n7. **Group Policy** — Verify GPOs apply correctly to test accounts\n8. **Backup** — Run and verify at least one full backup\n9. **Performance** — Check CPU, RAM, and disk usage under load\n10. **Security** — Run a vulnerability scan and apply patches" },
      { type: "callout", content: "Test with actual user accounts from different departments. Admin accounts often bypass restrictions, masking permission issues.", variant: "warning" },
      { type: "text", content: "## Documentation Requirements\n\nEvery server deployment should include:\n\n- **Server Specification Sheet** — Hardware, OS version, installed roles\n- **Network Diagram** — IP addresses, VLANs, connected devices\n- **Configuration Checklist** — All settings applied\n- **User/Group Matrix** — Who has access to what\n- **Backup Schedule** — What, when, and where backups run\n- **Disaster Recovery Plan** — Steps to restore service after failure\n- **Change Log** — Record of all modifications after deployment" },
      { type: "callout", content: "Documentation is not optional. When a server fails at 2 AM, clear documentation is the difference between a 10-minute fix and a 4-hour outage.", variant: "tip" },
    ],
    quiz: [
      { question: "Why should you test with non-admin user accounts?", options: ["To save time", "Admin accounts bypass restrictions, hiding issues", "Non-admin accounts are faster", "It doesn't matter"], correctIndex: 1, explanation: "Admin accounts have elevated privileges that bypass many restrictions, so testing with them can mask permission and policy issues." },
      { question: "What should be included in server documentation?", options: ["Only the server name", "Full specs, network diagram, and backup schedule", "Just the IP address", "Nothing, it's optional"], correctIndex: 1, explanation: "Comprehensive documentation including specs, network diagrams, backup schedules, and recovery plans is essential for operations." },
      { question: "What is the purpose of a disaster recovery plan?", options: ["To prevent all failures", "To restore service after a failure", "To upgrade hardware", "To train new employees"], correctIndex: 1, explanation: "A disaster recovery plan outlines the steps needed to restore services after a system failure or outage." },
    ],
  },

  // ─── CORE: Maintain & Repair ───
  "plan-maintenance": {
    topicId: "plan-maintenance",
    title: "Planning Maintenance & Repair",
    xpReward: 20,
    estimatedMinutes: 12,
    sections: [
      { type: "text", content: "Effective maintenance prevents failures before they happen. Planning is the first and most critical step in any maintenance or repair workflow." },
      { type: "text", content: "## Types of Maintenance\n\n- **Preventive** — Scheduled tasks to prevent failures (cleaning, updates, backups)\n- **Corrective** — Fixing issues after they occur (replacing failed components)\n- **Predictive** — Using monitoring data to predict and prevent failures\n- **Adaptive** — Modifying systems to meet new requirements" },
      { type: "text", content: "## Creating a Maintenance Plan\n\n1. **Inventory** — List all systems, components, and their specifications\n2. **Schedule** — Define frequency (daily, weekly, monthly, quarterly)\n3. **Checklists** — Create step-by-step procedures for each task\n4. **Parts & Tools** — Stock spare parts and keep tools ready\n5. **Documentation** — Record all maintenance activities\n6. **Escalation** — Define when to escalate to senior technicians" },
      { type: "list", items: [
        "**Daily** — Check system logs, verify backups, monitor alerts",
        "**Weekly** — Run disk cleanup, check storage capacity, review updates",
        "**Monthly** — Apply patches, clean hardware, test UPS batteries",
        "**Quarterly** — Full system audit, firmware updates, capacity planning",
      ]},
      { type: "callout", content: "Keep a spare parts kit ready: extra RAM, hard drives, network cables, power supplies, and thermal paste. Downtime costs money.", variant: "tip" },
    ],
    quiz: [
      { question: "What type of maintenance is performed on a schedule to PREVENT failures?", options: ["Corrective", "Preventive", "Adaptive", "Emergency"], correctIndex: 1, explanation: "Preventive maintenance involves scheduled tasks designed to prevent equipment failures before they occur." },
      { question: "What should a maintenance plan include?", options: ["Only a parts list", "Inventory, schedule, checklists, and documentation", "Just a calendar date", "Nothing, just fix things when they break"], correctIndex: 1, explanation: "A comprehensive maintenance plan includes inventory, schedules, checklists, spare parts, documentation, and escalation procedures." },
      { question: "How often should you check system logs and verify backups?", options: ["Yearly", "Monthly", "Daily", "Only when there's a problem"], correctIndex: 2, explanation: "System logs and backup verification should be checked daily to catch issues early." },
    ],
  },
  "diagnose-faults": {
    topicId: "diagnose-faults",
    title: "Diagnosing Hardware & Software Faults",
    xpReward: 30,
    estimatedMinutes: 18,
    sections: [
      { type: "text", content: "Diagnosing faults is a systematic process of identifying the root cause of hardware or software problems. A skilled technician follows a logical methodology rather than guessing." },
      { type: "text", content: "## The Diagnostic Process\n\n1. **Identify the problem** — Gather information from the user and observe symptoms\n2. **Establish a theory** — Consider probable causes based on symptoms\n3. **Test the theory** — Verify your hypothesis with targeted tests\n4. **Plan the fix** — Determine the appropriate solution\n5. **Implement the fix** — Apply the repair or replacement\n6. **Verify** — Confirm the issue is resolved\n7. **Document** — Record the problem, cause, and solution" },
      { type: "text", content: "## Common Hardware Symptoms\n\n- **No power** — Check PSU, power cable, outlet, and power switch\n- **Beep codes** — Refer to motherboard manual (RAM, GPU, or CPU errors)\n- **Blue screen (BSOD)** — Often RAM, driver, or storage failure\n- **Overheating** — Check fans, thermal paste, dust buildup\n- **Strange noises** — Clicking HDD (failing), grinding fan (worn bearing)\n- **Display issues** — Check GPU, cable, monitor, and drivers\n- **Slow performance** — Check RAM usage, disk health, malware" },
      { type: "callout", content: "POST beep codes are your first diagnostic clue when a system won't boot. One short beep usually means success; multiple beeps indicate specific hardware failures.", variant: "info" },
      { type: "text", content: "## Common Software Symptoms\n\n- **Crashes/freezes** — Check event logs, RAM, and driver conflicts\n- **Slow boot** — Too many startup programs, fragmented drive, or failing disk\n- **Application errors** — Missing dependencies, corrupted files, or incompatibility\n- **Network issues** — Driver problems, misconfigured settings, or malware\n- **Virus symptoms** — Pop-ups, slow performance, unexpected processes" },
      { type: "text", content: "## Diagnostic Tools\n\n- **Windows Event Viewer** — System logs and error messages\n- **Task Manager** — CPU, RAM, disk, and network usage\n- **Device Manager** — Hardware status and driver issues\n- **chkdsk** — Check disk for file system errors\n- **memtest86** — RAM diagnostic (runs at boot)\n- **CrystalDiskInfo** — SMART data for HDD/SSD health\n- **HWMonitor** — Temperature and voltage monitoring" },
    ],
    quiz: [
      { question: "What is the FIRST step in diagnosing a fault?", options: ["Replace all components", "Identify and gather information about the problem", "Format the hard drive", "Call the manufacturer"], correctIndex: 1, explanation: "The first step is always to identify the problem by gathering information from the user and observing symptoms." },
      { question: "What do multiple beeps during POST usually indicate?", options: ["Successful boot", "Specific hardware failure", "Software update needed", "Full battery"], correctIndex: 1, explanation: "Multiple POST beep codes indicate specific hardware failures; the pattern identifies which component has the issue." },
      { question: "Which tool checks RAM for errors?", options: ["chkdsk", "CrystalDiskInfo", "memtest86", "Task Manager"], correctIndex: 2, explanation: "memtest86 is a dedicated RAM diagnostic tool that runs at boot time to thoroughly test memory." },
      { question: "What should you ALWAYS do after fixing a fault?", options: ["Delete logs", "Document the problem and solution", "Ignore it", "Change the password"], correctIndex: 1, explanation: "Documentation creates a knowledge base for future reference and helps other technicians handle similar issues." },
    ],
  },
  "rectify-defects": {
    topicId: "rectify-defects",
    title: "Rectifying & Repairing Defects",
    xpReward: 25,
    estimatedMinutes: 15,
    sections: [
      { type: "text", content: "Once a fault is diagnosed, the next step is to plan and execute the repair. This involves selecting the right approach—repair, replace, or reconfigure." },
      { type: "text", content: "## Hardware Repairs\n\n### Component Replacement\n- **RAM** — Remove and replace faulty modules (match specifications)\n- **Storage** — Clone failing drive before it dies completely\n- **PSU** — Replace with equal or higher wattage unit\n- **GPU** — Reseat first; replace if faulty\n- **Fans** — Replace worn bearings or broken blades\n- **Thermal paste** — Reapply if dried out (every 2-3 years)\n\n### Connection Fixes\n- Reseat loose cables (SATA, power, front panel headers)\n- Replace damaged cables\n- Clean corroded contacts with isopropyl alcohol" },
      { type: "callout", content: "Before replacing a component, try reseating it first. Loose connections account for a surprising number of 'hardware failures.'", variant: "tip" },
      { type: "text", content: "## Software Repairs\n\n- **Driver rollback** — Revert to a previous driver version\n- **System Restore** — Roll back to a known good state\n- **Repair install** — Reinstall the OS while keeping files\n- **Safe Mode** — Boot with minimal drivers for troubleshooting\n- **SFC /scannow** — Scan and repair corrupted system files\n- **Clean install** — Last resort; format and reinstall everything" },
      { type: "text", content: "## Network Repairs\n\n- **Replace faulty cables** — Test with a known good cable\n- **Reset network settings** — `netsh winsock reset` and `netsh int ip reset`\n- **Reconfigure** — Check IP, gateway, DNS settings\n- **Replace hardware** — Swap NICs, switches, or access points\n- **Firmware updates** — Update router/switch firmware" },
    ],
    quiz: [
      { question: "What should you try BEFORE replacing a suspect hardware component?", options: ["Format the drive", "Reseat the component", "Buy a new computer", "Ignore the problem"], correctIndex: 1, explanation: "Reseating a component fixes loose connections, which are a surprisingly common cause of apparent hardware failures." },
      { question: "What Windows command repairs corrupted system files?", options: ["chkdsk", "defrag", "SFC /scannow", "format"], correctIndex: 2, explanation: "SFC /scannow (System File Checker) scans for and repairs corrupted or missing Windows system files." },
      { question: "What should you do with a failing hard drive before it dies?", options: ["Ignore it", "Clone it to a new drive", "Defragment it", "Format it"], correctIndex: 1, explanation: "Cloning a failing drive preserves all data and settings before the drive fails completely." },
    ],
  },
  "inspect-test": {
    topicId: "inspect-test",
    title: "Inspecting & Testing Repaired Systems",
    xpReward: 20,
    estimatedMinutes: 12,
    sections: [
      { type: "text", content: "After a repair, thorough inspection and testing ensures the fix is complete and no new issues were introduced. This is the quality assurance step of the repair process." },
      { type: "text", content: "## Post-Repair Testing Checklist\n\n1. **Visual inspection** — Check all connections, screws, and cable routing\n2. **Power on test** — System boots without errors or beep codes\n3. **OS functionality** — Windows/Linux loads to desktop properly\n4. **Device Manager** — No yellow exclamation marks or missing drivers\n5. **Network connectivity** — Ping gateway, test internet access\n6. **Peripheral test** — USB ports, audio, display, keyboard, mouse\n7. **Performance test** — Run benchmarks, check temperatures\n8. **Stress test** — Run under load for 15-30 minutes\n9. **User verification** — Have the user confirm the original issue is resolved" },
      { type: "callout", content: "Always let a repaired system run for at least 15-30 minutes under normal use. Some issues only appear after the system warms up.", variant: "info" },
      { type: "text", content: "## Documentation After Repair\n\nRecord the following:\n\n- **Date and technician name**\n- **Original problem reported**\n- **Diagnostic steps taken**\n- **Root cause identified**\n- **Repair performed** (parts replaced, software fixed)\n- **Test results** (pass/fail for each test)\n- **Recommendations** (future maintenance or upgrades)" },
      { type: "callout", content: "A repair is not complete until the user confirms the problem is solved. Technical tests alone don't guarantee user satisfaction.", variant: "tip" },
    ],
    quiz: [
      { question: "How long should you run a stress test after repair?", options: ["1 minute", "5 minutes", "15-30 minutes", "24 hours"], correctIndex: 2, explanation: "Running a stress test for 15-30 minutes helps reveal heat-related or intermittent issues that don't appear immediately." },
      { question: "When is a repair truly complete?", options: ["When you close the case", "When the user confirms the problem is solved", "When it powers on", "When you document it"], correctIndex: 1, explanation: "A repair is only complete when the end user verifies that the original issue is resolved and the system works as expected." },
      { question: "What should you check in Device Manager after a repair?", options: ["Internet speed", "No yellow exclamation marks or missing drivers", "Desktop wallpaper", "Browser history"], correctIndex: 1, explanation: "Yellow exclamation marks in Device Manager indicate driver issues or hardware problems that still need attention." },
    ],
  },

  // ─── COMMON COMPETENCIES ───
  "quality-assess": {
    topicId: "quality-assess",
    title: "Quality Assessment of Materials",
    xpReward: 15,
    estimatedMinutes: 8,
    sections: [
      { type: "text", content: "Quality standards ensure that computer servicing work meets professional benchmarks. As a technician, you must assess both the materials you use and the quality of your completed work." },
      { type: "text", content: "## Key Quality Checks\n\n- Verify component authenticity and specifications\n- Check cables for proper termination and labeling\n- Test all connections before finalizing\n- Document work with checklists and sign-offs\n- Follow manufacturer guidelines and industry standards (ISO)" },
      { type: "callout", content: "Always compare component specifications against the system requirements before installation. Using incompatible parts can cause system instability.", variant: "warning" },
    ],
    quiz: [
      { question: "Why should you verify component specifications before installation?", options: ["To check the price", "To ensure compatibility with the system", "To read the manual", "To update firmware"], correctIndex: 1, explanation: "Verifying specifications ensures compatibility and prevents system instability from incompatible parts." },
      { question: "What should you do after completing a servicing task?", options: ["Leave immediately", "Document work with checklists", "Delete all files", "Ignore testing"], correctIndex: 1, explanation: "Documenting work ensures quality assurance and provides a record for future reference." },
    ],
  },
  "data-input": {
    topicId: "data-input",
    title: "Data Input & File Management",
    xpReward: 15,
    estimatedMinutes: 8,
    sections: [
      { type: "text", content: "Basic computer operations include efficiently inputting data, accessing information, and managing files—skills every technician needs daily." },
      { type: "text", content: "## File Management Best Practices\n\n- Use descriptive, consistent file naming conventions\n- Organize files in logical folder hierarchies\n- Regularly back up important files\n- Use appropriate file formats (PDF for documents, CSV for data)\n- Set proper file permissions to control access" },
      { type: "list", items: [
        "**Naming** — project_name_v2_2024.docx (not 'final final v3.docx')",
        "**Organization** — Group by project, date, or category",
        "**Backup** — Follow the 3-2-1 rule (3 copies, 2 media types, 1 offsite)",
        "**Security** — Encrypt sensitive files, use strong passwords",
      ]},
    ],
    quiz: [
      { question: "What is the 3-2-1 backup rule?", options: ["3 files, 2 folders, 1 drive", "3 copies, 2 media types, 1 offsite", "3 passwords, 2 users, 1 admin", "3 GB, 2 TB, 1 PB"], correctIndex: 1, explanation: "The 3-2-1 rule means keeping 3 copies of data on 2 different media types with 1 stored offsite." },
    ],
  },
  "measurements": {
    topicId: "measurements",
    title: "Measurements & Calculations",
    xpReward: 15,
    estimatedMinutes: 10,
    sections: [
      { type: "text", content: "Technicians regularly measure physical dimensions, calculate storage capacities, and check electrical values. Accuracy in mensuration and calculation prevents costly errors." },
      { type: "text", content: "## Storage Capacity\n\nDigital storage uses binary units:\n\n- **1 Byte** = 8 bits\n- **1 KB (Kilobyte)** = 1,024 Bytes\n- **1 MB (Megabyte)** = 1,024 KB\n- **1 GB (Gigabyte)** = 1,024 MB\n- **1 TB (Terabyte)** = 1,024 GB\n\nNote: Drive manufacturers use decimal (1 GB = 1,000 MB), so a '500 GB' drive shows as ~465 GB in the OS." },
      { type: "text", content: "## Electrical Units\n\n- **Voltage (V)** — Electrical pressure (measured in Volts)\n- **Current (A)** — Flow of electrons (measured in Amperes)\n- **Resistance (Ω)** — Opposition to current (measured in Ohms)\n- **Power (W)** — Watts = Volts × Amperes\n\n### Common PC Voltages\n- **+12V** — Drives motors (fans, HDDs), GPU power\n- **+5V** — Logic circuits, USB ports\n- **+3.3V** — RAM, chipset, some CPU circuits" },
      { type: "callout", content: "Ohm's Law: V = I × R. This fundamental formula relates voltage, current, and resistance. Master it for diagnosing electrical faults.", variant: "info" },
      { type: "text", content: "## Physical Measurements\n\n- **Form factors** — ATX (305×244mm), Micro-ATX (244×244mm), Mini-ITX (170×170mm)\n- **Drive bays** — 3.5\" for HDD, 2.5\" for SSD/laptop drives\n- **Rack units** — 1U = 44.45mm (1.75\") height in server racks\n- **Cable lengths** — Use a measuring tape, max 100m for Ethernet" },
    ],
    quiz: [
      { question: "How many bytes are in 1 Kilobyte (binary)?", options: ["1,000", "1,024", "1,048", "1,100"], correctIndex: 1, explanation: "In binary computing, 1 KB = 1,024 Bytes (2^10)." },
      { question: "What is the formula for Ohm's Law?", options: ["V = I + R", "V = I × R", "V = I / R", "V = I - R"], correctIndex: 1, explanation: "Ohm's Law states that Voltage equals Current multiplied by Resistance (V = I × R)." },
      { question: "Which voltage rail powers USB ports in a PC?", options: ["+12V", "+5V", "+3.3V", "+1.5V"], correctIndex: 1, explanation: "USB ports operate on the +5V rail, providing power for connected devices." },
    ],
  },
  "schematics": {
    topicId: "schematics",
    title: "Reading Schematics & Diagrams",
    xpReward: 20,
    estimatedMinutes: 12,
    sections: [
      { type: "text", content: "Technical drawings and schematics are the language of electronics. A technician must be able to read and interpret them to understand circuits, layouts, and network topologies." },
      { type: "text", content: "## Types of Technical Drawings\n\n- **Schematic diagrams** — Show electrical connections using standard symbols\n- **Block diagrams** — High-level overview of system components\n- **Wiring diagrams** — Physical layout of wires and connections\n- **Network topology diagrams** — Layout of network devices and connections\n- **PCB layouts** — Printed circuit board component placement" },
      { type: "text", content: "## Common Electrical Symbols\n\n- **Resistor** — Zigzag line\n- **Capacitor** — Two parallel lines (one curved for polarized)\n- **Diode** — Triangle with a line (current flows one way)\n- **LED** — Diode symbol with arrows (light emission)\n- **Transistor** — NPN/PNP symbols with base, collector, emitter\n- **Ground** — Three decreasing horizontal lines\n- **Battery** — Long and short parallel lines alternating" },
      { type: "callout", content: "When reading a schematic, trace the current flow from the power source through the circuit back to ground. This helps you understand the circuit's function.", variant: "tip" },
      { type: "text", content: "## Network Topology Diagrams\n\n- **Star** — All devices connect to a central switch/hub\n- **Bus** — All devices share a single cable\n- **Ring** — Devices connect in a circular chain\n- **Mesh** — Every device connects to every other device\n- **Hybrid** — Combination of topologies" },
    ],
    quiz: [
      { question: "What type of diagram shows electrical connections using standard symbols?", options: ["Block diagram", "Wiring diagram", "Schematic diagram", "Flowchart"], correctIndex: 2, explanation: "Schematic diagrams use standardized symbols to show how electrical components are connected." },
      { question: "What does the zigzag symbol represent in a schematic?", options: ["Capacitor", "Diode", "Resistor", "Transistor"], correctIndex: 2, explanation: "The zigzag line is the standard symbol for a resistor in electrical schematics." },
      { question: "In which topology do all devices connect to a central switch?", options: ["Bus", "Ring", "Mesh", "Star"], correctIndex: 3, explanation: "In a star topology, all devices connect to a central switch or hub, which is the most common LAN layout." },
    ],
  },
  "tool-selection": {
    topicId: "tool-selection",
    title: "Tool Selection & Maintenance",
    xpReward: 15,
    estimatedMinutes: 10,
    sections: [
      { type: "text", content: "A skilled technician knows their tools. Selecting the right tool for the job and keeping tools in good condition is fundamental to quality work." },
      { type: "text", content: "## Essential Technician Tools\n\n- **Phillips screwdriver** (#1 and #2) — Most common for PC screws\n- **Flat-head screwdriver** — For some older components\n- **Torx screwdriver** — For laptops and specialty screws\n- **Anti-static wrist strap** — ESD protection\n- **Crimping tool** — For RJ-45 connectors\n- **Cable tester** — To verify network cables\n- **Multimeter** — For electrical measurements\n- **Compressed air** — For cleaning dust\n- **Thermal paste** — For CPU cooler installation\n- **Magnetic parts tray** — Keeps screws organized" },
      { type: "callout", content: "Keep your tools clean, calibrated, and organized. A well-maintained toolkit saves time and prevents damage to components.", variant: "tip" },
    ],
    quiz: [
      { question: "Which screwdriver type is most commonly used for PC assembly?", options: ["Flat-head", "Phillips", "Torx", "Hex"], correctIndex: 1, explanation: "Phillips screwdrivers (#1 and #2) fit the majority of screws used in desktop and laptop computers." },
      { question: "What tool is used to check faulty electronic components?", options: ["Crimping tool", "Cable tester", "Multimeter", "Wire stripper"], correctIndex: 2, explanation: "A multimeter measures voltage, current, and resistance to diagnose faulty components." },
    ],
  },
  "wiring-connections": {
    topicId: "wiring-connections",
    title: "Wiring & Connections",
    xpReward: 20,
    estimatedMinutes: 12,
    sections: [
      { type: "text", content: "Properly terminating and connecting electrical wiring is crucial for safe and reliable computer systems. Incorrect wiring can cause equipment damage, data loss, or even fire hazards." },
      { type: "text", content: "## Internal Computer Connections\n\n- **24-pin ATX connector** — Main motherboard power\n- **8-pin (4+4) CPU connector** — CPU power\n- **6/8-pin PCIe connector** — GPU power\n- **SATA power** — Storage drives and optical drives\n- **SATA data** — Storage data transfer\n- **Front panel headers** — Power button, reset, LEDs, USB, audio\n- **Fan headers** — CPU fan, case fans (3-pin or 4-pin PWM)" },
      { type: "callout", content: "Never force a connector into a port. All PC connectors are keyed to prevent incorrect insertion. If it doesn't fit, you have the wrong connector or orientation.", variant: "warning" },
      { type: "text", content: "## External Connections\n\n- **RJ-45** — Ethernet networking\n- **USB-A / USB-C** — Peripherals and data transfer\n- **HDMI / DisplayPort** — Video output\n- **VGA / DVI** — Legacy video output\n- **3.5mm audio** — Speakers and microphones\n- **Power cables** — C13/C14 (computers), C7/C8 (monitors)" },
      { type: "text", content: "## Safety Guidelines\n\n1. Always disconnect power before working on internal wiring\n2. Inspect cables for damage before connecting\n3. Route cables away from fans and heat sources\n4. Use cable ties or velcro for cable management\n5. Never splice or repair power cables — replace them\n6. Ensure proper grounding of all equipment" },
    ],
    quiz: [
      { question: "What powers the motherboard with the largest connector?", options: ["8-pin CPU", "SATA power", "24-pin ATX", "6-pin PCIe"], correctIndex: 2, explanation: "The 24-pin ATX connector is the main power connector that supplies power to the motherboard." },
      { question: "What should you do if a connector won't fit into a port?", options: ["Push harder", "Check orientation — connectors are keyed", "Cut the connector", "Use tape"], correctIndex: 1, explanation: "All PC connectors are keyed to prevent incorrect insertion. If it doesn't fit, check your orientation or connector type." },
      { question: "What should you NEVER do with a damaged power cable?", options: ["Replace it", "Inspect it", "Splice and repair it", "Unplug it"], correctIndex: 2, explanation: "Never splice or repair power cables — always replace them entirely to prevent fire hazards and electrical damage." },
    ],
  },
  "multimeter-testing": {
    topicId: "multimeter-testing",
    title: "Multimeter Testing",
    xpReward: 20,
    estimatedMinutes: 14,
    sections: [
      { type: "text", content: "A multimeter is one of the most essential diagnostic tools for any technician. It measures voltage, current, and resistance to help identify faulty components and verify circuits." },
      { type: "text", content: "## Multimeter Modes\n\n- **DC Voltage (V⎓)** — Measure battery and PSU output voltages\n- **AC Voltage (V~)** — Measure wall outlet voltage\n- **Resistance (Ω)** — Check component resistance and continuity\n- **Continuity (🔊)** — Test if a wire or fuse is intact (beeps if continuous)\n- **DC Current (A⎓)** — Measure current draw (requires series connection)\n- **Diode Test** — Check if diodes and LEDs function correctly" },
      { type: "callout", content: "Always start with the highest range and work down. Selecting too low a range can damage the multimeter or give inaccurate readings.", variant: "warning" },
      { type: "text", content: "## Common PC Measurements\n\n### PSU Voltage Test (with system running)\n- **Yellow wire to black** = +12V (±5% = 11.4V–12.6V)\n- **Red wire to black** = +5V (±5% = 4.75V–5.25V)\n- **Orange wire to black** = +3.3V (±5% = 3.14V–3.47V)\n\n### Continuity Tests\n- **Fuses** — Should beep (continuous circuit)\n- **Cables** — Each wire should show continuity end-to-end\n- **Switches** — Should toggle between continuous and open\n\n### Component Tests\n- **Capacitors** — Should show rising resistance, then OL (open line)\n- **Resistors** — Should match the color-coded value (within tolerance)" },
      { type: "callout", content: "Never measure resistance on a live (powered) circuit. Always disconnect power first or you'll get false readings and may damage the meter.", variant: "warning" },
    ],
    quiz: [
      { question: "What does the continuity mode test?", options: ["Voltage level", "Whether a circuit path is complete", "Current draw", "Temperature"], correctIndex: 1, explanation: "Continuity mode tests whether there is a complete circuit path — it beeps if the path is unbroken." },
      { question: "What is the acceptable range for a +12V PSU rail?", options: ["10V–14V", "11.4V–12.6V", "12V exactly", "11V–13V"], correctIndex: 1, explanation: "The ATX specification allows ±5% tolerance, making 11.4V to 12.6V the acceptable range for the +12V rail." },
      { question: "What should you NEVER do when measuring resistance?", options: ["Use the red probe", "Measure on a live circuit", "Start at the highest range", "Check the battery"], correctIndex: 1, explanation: "Never measure resistance on a powered circuit — it gives false readings and can damage the multimeter." },
    ],
  },

  // ─── BASIC COMPETENCIES ───
  "tech-communication": {
    topicId: "tech-communication",
    title: "Technical Communication",
    xpReward: 10,
    estimatedMinutes: 8,
    sections: [
      { type: "text", content: "Effective communication is essential for technicians who must explain technical concepts to non-technical users and collaborate with team members." },
      { type: "text", content: "## Key Communication Skills\n\n- **Active listening** — Understand the user's actual problem\n- **Plain language** — Avoid jargon when speaking to non-technical users\n- **Documentation** — Write clear service reports and technical notes\n- **Email etiquette** — Professional, concise, and actionable\n- **Presentation** — Convey findings in meetings clearly" },
      { type: "callout", content: "When a user says 'my computer is slow,' ask targeted questions: When did it start? What programs are running? Any recent changes? This narrows down the issue efficiently.", variant: "tip" },
    ],
    quiz: [
      { question: "How should you communicate technical issues to non-technical users?", options: ["Use as much jargon as possible", "Use plain, simple language", "Write long technical reports", "Send them to Google"], correctIndex: 1, explanation: "Plain language ensures the user understands the issue and the solution without confusion." },
    ],
  },
  "team-collab": {
    topicId: "team-collab",
    title: "Team Collaboration",
    xpReward: 10,
    estimatedMinutes: 8,
    sections: [
      { type: "text", content: "In any IT environment, working effectively with colleagues is just as important as technical skills. Good teamwork leads to faster problem resolution and a better workplace." },
      { type: "text", content: "## Effective Team Practices\n\n- **Know your role** — Understand your responsibilities and boundaries\n- **Share knowledge** — Document solutions and share with the team\n- **Communicate status** — Keep the team informed on task progress\n- **Respect deadlines** — Deliver on time or communicate delays early\n- **Give and receive feedback** — Constructive criticism improves everyone" },
      { type: "text", content: "## Collaboration in IT Teams\n\n- Use **ticketing systems** (e.g., Jira, ServiceNow) for task tracking\n- Maintain a shared **knowledge base** for common issues\n- Participate in **daily standups** or team check-ins\n- **Escalate properly** — Know when to ask for help\n- **Pair troubleshooting** — Two minds solve problems faster" },
      { type: "callout", content: "If you can't solve a problem within your scope, escalate it early. Sitting on a difficult issue wastes time and may impact others.", variant: "tip" },
    ],
    quiz: [
      { question: "When should you escalate a problem?", options: ["Never, always solve it yourself", "When it's beyond your scope", "After 24 hours", "Only if the manager asks"], correctIndex: 1, explanation: "Escalate when a problem is beyond your skill or scope — early escalation prevents delays and bigger issues." },
      { question: "What tool helps IT teams track tasks and issues?", options: ["Word processor", "Ticketing system", "Calculator", "Email only"], correctIndex: 1, explanation: "Ticketing systems like Jira or ServiceNow organize, prioritize, and track team tasks and issues." },
    ],
  },
  "career-growth": {
    topicId: "career-growth",
    title: "Work Priorities & Growth",
    xpReward: 10,
    estimatedMinutes: 8,
    sections: [
      { type: "text", content: "Career professionalism means managing your daily work priorities effectively while planning for long-term professional growth in the IT industry." },
      { type: "text", content: "## Managing Work Priorities\n\n- **Urgency vs importance** — Use the Eisenhower Matrix\n- **Critical issues first** — Server down > desktop issue > cosmetic fix\n- **Time management** — Estimate and allocate time for each task\n- **Avoid multitasking** — Focus on one task to completion\n- **Review at end of day** — Plan tomorrow's priorities tonight" },
      { type: "text", content: "## Professional Growth Path\n\nIT certifications and continuous learning drive career advancement:\n\n- **CompTIA A+** — Entry-level hardware and software\n- **CompTIA Network+** — Networking fundamentals\n- **CompTIA Security+** — Cybersecurity basics\n- **CCNA** — Cisco networking\n- **MCSA / Azure** — Microsoft server and cloud\n- **TESDA NC II** — Philippine national certification for CSS" },
      { type: "callout", content: "Set a learning goal: spend at least 30 minutes daily on professional development—read articles, watch tutorials, or practice labs.", variant: "tip" },
    ],
    quiz: [
      { question: "Which framework helps you prioritize tasks by urgency and importance?", options: ["Gantt chart", "Eisenhower Matrix", "Kanban board", "SWOT analysis"], correctIndex: 1, explanation: "The Eisenhower Matrix categorizes tasks into four quadrants based on urgency and importance to help prioritize." },
      { question: "What is the entry-level CompTIA certification for technicians?", options: ["Network+", "Security+", "A+", "CCNA"], correctIndex: 2, explanation: "CompTIA A+ is the industry-standard entry-level certification covering hardware and software fundamentals." },
    ],
  },
  "hazard-control": {
    topicId: "hazard-control",
    title: "Hazard Identification & Control",
    xpReward: 15,
    estimatedMinutes: 10,
    sections: [
      { type: "text", content: "Occupational Health and Safety (OHS) is critical in any technical workplace. Identifying hazards and controlling risks protects both you and your colleagues." },
      { type: "text", content: "## Common Workplace Hazards\n\n- **Electrical hazards** — Exposed wires, faulty PSUs, improper grounding\n- **Ergonomic hazards** — Poor posture, repetitive strain\n- **Chemical hazards** — Cleaning solvents, thermal paste chemicals\n- **Physical hazards** — Sharp edges on cases, heavy equipment\n- **ESD hazards** — Static discharge damaging components" },
      { type: "text", content: "## Risk Control Hierarchy\n\n1. **Elimination** — Remove the hazard entirely\n2. **Substitution** — Replace with something safer\n3. **Engineering controls** — Isolate people from the hazard\n4. **Administrative controls** — Change the way people work\n5. **PPE** — Personal protective equipment (last resort)" },
      { type: "callout", content: "Always report hazards immediately. Don't assume someone else will handle it. In the Philippines, RA 11058 strengthens OHS standards.", variant: "warning" },
    ],
    quiz: [
      { question: "What is the FIRST step in the risk control hierarchy?", options: ["Use PPE", "Elimination", "Engineering controls", "Substitution"], correctIndex: 1, explanation: "Elimination—completely removing the hazard—is the most effective control measure and should be considered first." },
      { question: "What type of hazard is caused by improper grounding?", options: ["Chemical", "Ergonomic", "Electrical", "Physical"], correctIndex: 2, explanation: "Improper grounding creates electrical hazards that can cause shock, burns, or equipment damage." },
    ],
  },
  "logical-solving": {
    topicId: "logical-solving",
    title: "Logical Problem Solving",
    xpReward: 15,
    estimatedMinutes: 10,
    sections: [
      { type: "text", content: "Problem solving is a core workplace skill. Logical approaches prevent wasted effort and lead to consistent, repeatable solutions." },
      { type: "text", content: "## Problem-Solving Framework\n\n1. **Define the problem** — What exactly is wrong? Be specific\n2. **Gather information** — Collect data, logs, and user reports\n3. **Identify possible causes** — Brainstorm all potential reasons\n4. **Evaluate options** — Weigh pros and cons of each solution\n5. **Implement the solution** — Apply the best fix\n6. **Verify the result** — Confirm the problem is resolved\n7. **Document** — Record the problem and solution for future reference" },
      { type: "text", content: "## Problem-Solving Techniques\n\n- **Root Cause Analysis (RCA)** — Ask 'Why?' five times to find the root cause\n- **Process of elimination** — Rule out causes one by one\n- **Divide and conquer** — Split the problem in half to narrow the source\n- **Substitution** — Swap components to isolate the faulty one\n- **Research** — Check documentation, forums, and knowledge bases" },
      { type: "callout", content: "The '5 Whys' technique: keep asking 'Why?' to drill down from symptoms to root cause. Example: 'Why is the PC slow?' → 'Why is RAM at 95%?' → 'Why are 50 Chrome tabs open?' → User training needed!", variant: "tip" },
    ],
    quiz: [
      { question: "What is the first step in logical problem solving?", options: ["Implement a fix immediately", "Define the problem clearly", "Ask a colleague", "Restart the computer"], correctIndex: 1, explanation: "Clearly defining the problem is the essential first step — you can't solve what you haven't properly identified." },
      { question: "What technique involves asking 'Why?' repeatedly to find root cause?", options: ["Process of elimination", "5 Whys", "Divide and conquer", "Substitution"], correctIndex: 1, explanation: "The 5 Whys technique drills down through layers of symptoms to uncover the true root cause of a problem." },
      { question: "What is 'divide and conquer' in troubleshooting?", options: ["Splitting the team in half", "Splitting the problem in half to narrow the source", "Using two computers", "Creating two tickets"], correctIndex: 1, explanation: "Divide and conquer means testing at the midpoint to determine which half contains the fault, progressively narrowing down." },
    ],
  },
  "workflow-improvement": {
    topicId: "workflow-improvement",
    title: "Workflow Improvements",
    xpReward: 10,
    estimatedMinutes: 8,
    sections: [
      { type: "text", content: "Innovation in the workplace isn't just about new technology — it's about improving how work gets done. Even small process improvements can save significant time and effort." },
      { type: "text", content: "## Areas for Innovation\n\n- **Automation** — Script repetitive tasks (batch files, PowerShell)\n- **Templates** — Create standard templates for reports and checklists\n- **Tools** — Introduce better tools for common tasks\n- **Processes** — Streamline workflows to eliminate waste\n- **Documentation** — Improve knowledge bases and SOPs" },
      { type: "text", content: "## How to Propose Improvements\n\n1. **Identify the pain point** — What wastes time or causes errors?\n2. **Research solutions** — What tools or methods could help?\n3. **Estimate impact** — How much time/money would be saved?\n4. **Prototype** — Test the improvement on a small scale\n5. **Present** — Share results with your team or supervisor\n6. **Implement** — Roll out the improvement with proper documentation" },
      { type: "callout", content: "Start small: automate one repetitive task this week. Even a simple script that saves 5 minutes daily adds up to 20+ hours per year.", variant: "tip" },
    ],
    quiz: [
      { question: "What is the first step in proposing a workflow improvement?", options: ["Buy new software", "Identify the pain point", "Write a report", "Ask for a raise"], correctIndex: 1, explanation: "Identifying the specific pain point — what wastes time or causes errors — is the foundation of any improvement proposal." },
      { question: "How can you automate repetitive IT tasks?", options: ["Hire more people", "Use scripts and batch files", "Work faster manually", "Skip the tasks"], correctIndex: 1, explanation: "Scripts (batch files, PowerShell, Bash) automate repetitive tasks, saving time and reducing human error." },
    ],
  },
};

// Fallback lesson for topics without detailed content
export const getLesson = (topicId: string): LessonContent | null => {
  return lessonContents[topicId] || null;
};
