export interface Industry {
  slug: string;
  title: string;
  short: string;
  desc: string;
  keyCompliance: string[];
  /** Optional: state/city sectors most relevant to this industry */
  topMarkets?: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "manufacturing-industrial-plants",
    title: "Manufacturing & Industrial Plants",
    short: "PSARA licensing for industrial security guards, factory gate control, material entry supervision, and labour compliance.",
    desc: "Industrial facilities require specialized PSARA licensing covering armed/unarmed guards trained in factory gate entry, material inward/outward tracking, and fire safety protocols.",
    keyCompliance: [
      "Armed & Unarmed Guard Category License",
      "Factory Labour & EPF/ESIC Compliance Audit",
      "Fire Safety & Material Entry Register Protocols",
      "Supervisor PSARA Antecedent Clearances",
    ],
    topMarkets: ["Pune", "Surat", "Ludhiana", "Coimbatore", "Jamshedpur", "Faridabad"],
  },
  {
    slug: "corporate-it-tech-parks",
    title: "Corporate Hubs & IT Tech Parks",
    short: "PSARA compliance for corporate office guarding, access control systems, executive escorting, and multi-tenant security.",
    desc: "Tech parks and corporate headquarters mandate PSARA licensed agencies with verified antecedents, professional uniforms, and digitized visitor tracking capabilities.",
    keyCompliance: [
      "Access Control & Badge Verification Systems",
      "Executive Protection & Bouncer Deployment Licensing",
      "Multi-State Operating Authorization",
      "Night Shift Female Employee Escort Security Compliance",
    ],
    topMarkets: ["Bengaluru", "Hyderabad", "Gurugram", "Noida", "Chennai", "Pune"],
  },
  {
    slug: "banking-cash-in-transit",
    title: "Banking, ATMs & Cash-in-Transit (CIT)",
    short: "High-security PSARA licensing for bank branch guarding, ATM protection, armed guards, and cash van operations.",
    desc: "Banking and CIT security agencies operate under strict MHA Guidelines requiring specialized armed guard licensing, GPS-tracked vehicle compliance, and background-verified personnel.",
    keyCompliance: [
      "Armed Weapon License Endorsement",
      "Cash-in-Transit (CIT) Vehicle Guarding Verification",
      "Promoter Financial Antecedent & Bureau Audit",
      "Continuous Police Verification Protocols",
    ],
    topMarkets: ["Mumbai", "Delhi NCR", "Kolkata", "Chennai", "Ahmedabad"],
  },
  {
    slug: "healthcare-hospitals",
    title: "Healthcare & Hospital Complexes",
    short: "PSARA clearance for hospital security, emergency room crowd management, and patient security.",
    desc: "Hospitals need tactful security agency deployment licensed for 24/7 emergency room monitoring, parking management, and dispute de-escalation.",
    keyCompliance: [
      "De-escalation & Patient Soft-Skills Training Certification",
      "24/7 Shift Supervisor Licensing",
      "CCTV & Perimeter Surveillance Integration",
      "Hospital Disaster & Evacuation Protocols",
    ],
    topMarkets: ["Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Jaipur", "Lucknow"],
  },
  {
    slug: "real-estate-housing",
    title: "Real Estate & Residential Communities",
    short: "PSARA licensing for gated community security, builder site protection, high-rise residential guard deployment, and apartment complex compliance.",
    desc: "India's booming residential real estate sector demands PSARA-licensed security agencies with trained guards, visitor management systems, and welfare-compliant deployments across townships and gated communities.",
    keyCompliance: [
      "Gated Community Guard Deployment Compliance",
      "Site Supervisor Antecedent & Police Verification",
      "ESIC/PF Threshold Compliance for Multi-Site Deployment",
      "Night Duty Female Escort Protocol Licensing",
    ],
    topMarkets: ["Gurugram", "Noida", "Pune", "Bengaluru", "Hyderabad", "Chennai"],
  },
  {
    slug: "logistics-warehousing",
    title: "Logistics, Warehousing & 3PL",
    short: "PSARA compliance for warehouse guarding, cargo theft prevention, access control at distribution centres, and cold-chain facility security.",
    desc: "E-commerce growth and supply chain expansion have created surging demand for PSARA-licensed agencies covering large-format warehouses, inland container depots, and last-mile distribution hubs with material tracking guards.",
    keyCompliance: [
      "Material Inward/Outward Register & Gate Pass Compliance",
      "CCTV Surveillance Integration with Guard Management",
      "Multi-Shift Supervisor Deployment Licensing",
      "Fire Safety Protocol Guard Training Certification",
    ],
    topMarkets: ["Delhi NCR (Kundli/Manesar)", "Mumbai (Bhiwandi)", "Bengaluru", "Pune (Chakan)", "Ahmedabad", "Ludhiana"],
  },
  {
    slug: "education-campuses",
    title: "Educational Institutions & Campuses",
    short: "PSARA licensing for school & college security, hostel access control, campus perimeter guarding, and student safety compliance.",
    desc: "Schools, universities, and coaching institutes require PSARA-licensed agencies whose guards undergo background verification, soft-skills training, and child safety protocols to protect sensitive educational environments.",
    keyCompliance: [
      "Child-Safe Guard Antecedent & Police Verification",
      "Female Guard Deployment for Women's Hostels",
      "CCTV Monitoring Integration Compliance",
      "Emergency Evacuation Drill Certification",
    ],
    topMarkets: ["Delhi NCR", "Jaipur", "Lucknow", "Pune", "Chennai", "Bengaluru"],
  },
  {
    slug: "retail-malls",
    title: "Retail, Malls & High-Street Stores",
    short: "PSARA-compliant security for shopping malls, multiplexes, high-street retailers, and large-format stores.",
    desc: "Retail environments demand PSARA-licensed security personnel trained in loss prevention, crowd control, fire evacuation, and high-volume visitor access management — from anchor stores to food courts and multiplex cinemas.",
    keyCompliance: [
      "Loss Prevention Guard Training & Licensing",
      "Crowd Control & Event Security Certification",
      "Multi-Tenant Mall Security MOU Compliance",
      "ESIC Welfare Threshold Management for Retail Guards",
    ],
    topMarkets: ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Ahmedabad", "Jaipur"],
  },
  {
    slug: "hotels-hospitality",
    title: "Hotels, Resorts & Hospitality",
    short: "PSARA licensing for hotel security teams, resort access control, F&B area monitoring, and event-night security deployment.",
    desc: "Hotels and resorts in tourism hubs demand discreet, PSARA-certified security vendors whose guards present uniformly, carry verified police clearances, and integrate with front-desk access control systems.",
    keyCompliance: [
      "Hospitality-Grade Guard Soft-Skills Training",
      "Armed Guard License for High-Risk Hotels",
      "Event Night Security Scale-Up Compliance",
      "Armoury & Weapon Handling Registration (where applicable)",
    ],
    topMarkets: ["Goa", "Jaipur", "Delhi", "Mumbai", "Shimla", "Kochi"],
  },
  {
    slug: "pharma-biotech",
    title: "Pharma, Biotech & Chemical Plants",
    short: "PSARA clearance for GMP pharmaceutical facility security, biotech research campus access control, and chemical plant guard deployment.",
    desc: "Pharma and biotech campuses operate under stringent GMP and import/export regulations that require PSARA-compliant security vendors who understand clean-room access protocols, material security, and chemical plant emergency response.",
    keyCompliance: [
      "GMP-Compatible Guard Training & Antecedent Clearance",
      "Hazardous Material Handling Emergency Protocol Certification",
      "Access Control & Visitor Management Integration",
      "Armed Guard Licensing for High-Security Research Facilities",
    ],
    topMarkets: ["Hyderabad", "Ahmedabad", "Pune", "Bengaluru", "Chandigarh (Baddi)", "Mumbai"],
  },
  {
    slug: "mining-energy",
    title: "Mining, Power Plants & Renewable Energy",
    short: "PSARA licensing for coal/mineral mine security, thermal/solar/wind plant guarding, and remote-site security operations.",
    desc: "Mining and energy infrastructure — from coalfields in Jharkhand to solar parks in Rajasthan — requires PSARA-licensed agencies with guards trained in perimeter security, fire watch, and multi-shift remote deployments.",
    keyCompliance: [
      "Remote Site Multi-District PSARA Coverage",
      "Fire Watch & Hazardous Site Guard Training",
      "Armed Guard License for High-Value Mineral Facilities",
      "DGMS / Factory Inspectorate Liaison Compliance",
    ],
    topMarkets: ["Jharkhand (Dhanbad/Bokaro)", "Chhattisgarh (Korba)", "Rajasthan", "Odisha (Rourkela)", "Gujarat"],
  },
  {
    slug: "ports-cargo",
    title: "Ports, Cargo & Aviation",
    short: "PSARA compliance for sea port security, airport cargo terminal guarding, inland container depot protection, and customs-bonded warehouse security.",
    desc: "Port, cargo, and aviation security represent some of the most regulated deployments under PSARA — requiring agents with multi-district licences, special training in cargo handling zones, and coordination with Customs and CISF protocols.",
    keyCompliance: [
      "Multi-District PSARA License for Port-City Coverage",
      "Cargo & Customs Zone Guard Antecedent Clearance",
      "Armed Guard License for High-Security Port Areas",
      "ESIC/PF & Labour Compliance for Shift-Based Port Guards",
    ],
    topMarkets: ["Mumbai (JNPT)", "Chennai", "Visakhapatnam", "Kolkata (Haldia)", "Kandla (Gujarat)", "Kochi"],
  },
  {
    slug: "event-security",
    title: "Events, Exhibitions & Crowd Management",
    short: "PSARA licensing for concert security, IPL match guarding, trade fair protection, and political rally crowd management.",
    desc: "Large-scale events require PSARA-certified agencies capable of rapid scale-up, crowd management, VIP protection, and multi-city deployment — with licences covering all venue districts and trained bouncers on the payroll.",
    keyCompliance: [
      "Bouncer Deployment & Physical Standards Licensing",
      "Crowd Control & Emergency Evacuation Certification",
      "Multi-City Event Coverage PSARA License Strategy",
      "VIP / Celebrity Protection Agency Licensing",
    ],
    topMarkets: ["Delhi NCR", "Mumbai", "Bengaluru", "Jaipur", "Hyderabad", "Goa"],
  },
  {
    slug: "government-psu",
    title: "Government Offices, PSUs & Embassies",
    short: "PSARA-compliant security for government buildings, Public Sector Undertaking facilities, embassy premises, and strategic infrastructure.",
    desc: "Government and PSU security contracts are among the most scrutinized deployments — requiring PSARA-licensed vendors with rigorous antecedent verification, armed guard capabilities, and compliance with GeM portal procurement norms.",
    keyCompliance: [
      "GeM Portal Vendor Registration & PSARA Certificate Upload",
      "Government Tender PSARA Compliance Documentation",
      "Armed Guard License for Strategic/Embassy Deployments",
      "Police Character Clearance for All Deployed Personnel",
    ],
    topMarkets: ["Delhi NCR", "Lucknow", "Bhopal", "Jaipur", "Bhubaneswar", "Chandigarh"],
  },
  {
    slug: "data-centres-tech-infra",
    title: "Data Centres & Critical Tech Infrastructure",
    short: "PSARA licensing for hyperscale data centre security, NOC facility access control, and critical IT infrastructure guard deployments.",
    desc: "Data centres hosting government and enterprise cloud infrastructure demand PSARA-licensed security teams with background-verified guards, CCTV integration expertise, and strict protocols for biometric access zone management.",
    keyCompliance: [
      "Biometric & Access Control Integration Compliance",
      "24/7 Security Operations Centre (SOC) Guard Deployment",
      "ESIC/PF Labour Compliance for High-Headcount Deployments",
      "NDA-Backed Guard Antecedent & Confidentiality Clearance",
    ],
    topMarkets: ["Bengaluru", "Hyderabad", "Delhi NCR", "Mumbai", "Pune", "Chennai"],
  },
];
