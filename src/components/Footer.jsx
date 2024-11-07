import React from "react";
import { Info, Mail, Github } from "lucide-react";


const Footer = () => {
  return (
    <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-100">About</h3>
            <p className="text-sm text-slate-400">
              <span> Where is the sun ?</span>
              This web offers a simple way to understand the sun's position in
              the sky. It calculates the sun's direction and altitude and
              presents it through an interactive 3D visualization, giving you a
              live and precise view. It also provides helpful information like
              sunrise and sunset times, day length, and a yearly overview of
              them.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-100">
              Information Sources
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center hover:text-slate-100 transition-colors">
                <Info className="mr-2 h-4 w-4" />
                <a href="https://github.com/mourner/suncalc?tab=readme-ov-file">
                  {" "}
                  <span className="text-slate-100 font-semibold">suncalc</span>:
                  Provides sun position calculations.{" "}
                </a>
              </li>
              <li className="flex items-center hover:text-slate-100 transition-colors">
                <Info className="mr-2 h-4 w-4" />
                <a href="https://leafletjs.com/">
                  {" "}
                  <span className="text-slate-100 font-semibold">
                    react-leaflet
                  </span>
                  : Provides maps services{" "}
                </a>
              </li>
              <li className="flex items-center hover:text-slate-100 transition-colors">
                <Info className="mr-2 h-4 w-4" />
                <a href="https://www.suncalc.org/">
                  {" "}
                  <span className="text-slate-100 font-semibold">
                    suncalc.org
                  </span>
                  : A good website you should try{" "}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-100">
              Contact
            </h3>
            <div className="space-y-2">
              <a
                href="mailto:hello@gmail.com"
                className="flex items-center text-sm text-slate-400 hover:text-slate-100 transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                yuepem@gmail.com
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-slate-400 hover:text-slate-100 transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub Repository
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-100">
              Feedback
            </h3>
            <p className="mb-4 text-sm text-slate-400">
              Your feedback helps it improve. Share your thoughts about the
              application, or just let me know you like it.
            </p>
            
              {/* <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "rgb(38, 115, 121)",
                  "&:hover": {
                    backgroundColor: "rgb(44, 135, 142)",
                  },
                  textTransform: "none",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Send By Email
              </Button> */}
            
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Sun Position Tracker.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
