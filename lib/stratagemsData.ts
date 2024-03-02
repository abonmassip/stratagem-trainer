export interface StratagemType {
  name: string;
  code: string[];
}

export const stratagemsDataByCategory = {
  "Stratagem Category": [
    { name: "Reinforce", code: ["u", "d", "r", "l", "u"] },
    { name: "Resupply", code: ["d", "d", "u", "r"] },
    { name: "SOS Beacon", code: ["u", "d", "r", "u"] },
    { name: "SEAF Artillery", code: ["r", "u", "u", "d"] },
    { name: "Hellbomb", code: ["d", "u", "l", "d", "u", "r", "d", "u"] },
    { name: "Super Earth Flag", code: ["d", "u", "d", "u"] },
  ],
  "Patriotic Administration Center": [
    { name: "Machine Gun", code: ["d", "l", "d", "u", "r"] },
    { name: "Anti-Material Rifle", code: ["d", "l", "r", "u", "d"] },
    { name: "Stalwart", code: ["d", "l", "d", "u", "u", "l"] },
    { name: "Expendable Anti-Tank", code: ["d", "d", "l", "u", "r"] },
    { name: "Recoiless Rifle", code: ["d", "l", "r", "r", "l"] },
    { name: "Flamethrower", code: ["d", "l", "u", "d", "u"] },
    { name: "Auto-Cannon", code: ["d", "l", "d", "u", "u", "r"] },
    { name: "Railgun", code: ["d", "r", "d", "u", "l", "r"] },
    { name: "Spear", code: ["d", "d", "u", "d", "d"] },
  ],
  "Orbital Cannons": [
    { name: "Orbital Gatling Barrage", code: ["r", "d", "l", "u", "u"] },
    { name: "Orbital Airburst Strike", code: ["r", "r", "r"] },
    { name: "Orbital 120MM HE Barrage", code: ["r", "r", "d", "l", "r", "d"] },
    {
      name: "Orbital 380MM HE Barrage",
      code: ["r", "d", "u", "u", "l", "d", "d"],
    },
    { name: "Orbital Walking Barrage", code: ["r", "d", "r", "d", "r", "d"] },
    { name: "Orbital Laser", code: ["r", "d", "u", "r", "d"] },
    { name: "Orbital Railgun Strike", code: ["r", "u", "d", "d", "r"] },
  ],
  Hangar: [
    { name: "Eagle Straffing Run", code: ["u", "r", "r"] },
    { name: "Eagle Airstrike", code: ["u", "r", "d", "r"] },
    { name: "Eagle Cluster Bomb", code: ["u", "r", "d", "d", "r"] },
    { name: "Eagle Napalm Strike", code: ["u", "r", "d", "u"] },
    { name: "Jump Pack", code: ["d", "u", "u", "d", "u"] },
    { name: "Eagle Smoke Strike", code: ["u", "r", "d", "u"] },
    { name: "Eagle 110MM Rocket Pods", code: ["u", "r", "u", "l"] },
    { name: "Eagle 500KG Bomb", code: ["u", "r", "d", "d", "d"] },
    { name: "Eagle Rearm", code: ["u", "u", "l", "u", "r"] },
  ],
  Bridge: [
    { name: "Orbital Precision Strike", code: ["r", "r", "u"] },
    { name: "Orbital Gas Strike", code: ["r", "r", "d", "r"] },
    { name: "Orbital EMS Strike", code: ["r", "r", "l", "d"] },
    { name: "Orbital Smoke Strike", code: ["r", "r", "d", "u"] },
    { name: "HMG Placement", code: ["d", "u", "l", "r", "r", "l"] },
    { name: "Shield Generator", code: ["d", "d", "l", "r", "l", "r"] },
    { name: "Tesla Tower", code: ["d", "u", "r", "u", "l", "r"] },
  ],
  "Engineering Bay": [
    { name: "Anti-Personnel Minefield", code: ["d", "l", "u", "r"] },
    { name: "Supply Pack", code: ["d", "l", "d", "u", "u", "d"] },
    { name: "Grenade Launcher", code: ["d", "l", "u", "l", "d"] },
    { name: "Laser Cannon", code: ["d", "l", "d", "u", "l"] },
    { name: "Incendiary Mines", code: ["d", "l", "l", "d"] },
    { name: "Guard Dog Rover", code: ["u", "d", "l", "u", "r", "r"] },
    { name: "Ballistic Shield", code: ["d", "l", "d", "d", "u", "l"] },
    { name: "Arc Thrower", code: ["d", "r", "d", "u", "l", "l"] },
    { name: "Shield Generator Pack", code: ["d", "u", "l", "r", "l", "r"] },
  ],
  "Robotic Workshop": [
    { name: "Machine Gun Sentry", code: ["d", "u", "r", "r", "u"] },
    { name: "Gatling Sentry", code: ["d", "u", "r", "l"] },
    { name: "Mortar Sentry", code: ["d", "u", "r", "r", "d"] },
    { name: "Guard Dog", code: ["d", "u", "l", "u", "r", "d"] },
    { name: "Autocannon Sentry", code: ["d", "u", "r", "u", "l", "u"] },
    { name: "Rocket Sentry", code: ["d", "u", "r", "r", "l"] },
    { name: "EMS Mortar Sentry", code: ["d", "u", "r", "d", "r"] },
  ],
};

export const stratagemsData = Object.values(stratagemsDataByCategory).flat();
