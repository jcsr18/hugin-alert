import { OpportunityCron } from "@hugin-crons/OpportunityCron";
import dotenv from "dotenv";

dotenv.config();

new OpportunityCron().execute();

console.log("Press CTRL-C to stop\n");
