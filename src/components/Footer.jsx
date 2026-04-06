import React from "react";
import { Info, Mail, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">About</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              From the darkest winter days to the brightest summer nights, the
              tool helps to understand the sun&apos;s patterns. Perfect for Nordic
              countries where sunlight shapes daily life and annual rhythms
              through dramatic seasonal changes.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Information Sources
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center transition-colors hover:text-foreground">
                <Info className="mr-2 h-4 w-4 text-primary" />
                <a href="https://github.com/mourner/suncalc?tab=readme-ov-file">
                  <span className="font-semibold text-foreground">suncalc</span>:
                  Provides sun position calculations.
                </a>
              </li>
              <li className="flex items-center transition-colors hover:text-foreground">
                <Info className="mr-2 h-4 w-4 text-primary" />
                <a href="https://leafletjs.com/">
                  <span className="font-semibold text-foreground">
                    react-leaflet
                  </span>
                  : Provides maps services
                </a>
              </li>
              <li className="flex items-center transition-colors hover:text-foreground">
                <Info className="mr-2 h-4 w-4 text-primary" />
                <a href="https://www.suncalc.org/">
                  <span className="font-semibold text-foreground">
                    suncalc.org
                  </span>
                  : A good website you should try
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:yuepem@gmail.com"
                className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="mr-2 h-4 w-4 text-primary" />
                yuepem@gmail.com
              </a>
              <a
                href="https://github.com/yuepem/sunshine_project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="mr-2 h-4 w-4 text-primary" />
                GitHub Repository
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Feedback</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Your feedback helps it improve. Share your thoughts about the
              application, or just let me know you like it.
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-3 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p className="text-base italic">
            &quot;In the depth of winter, I finally learned that within me there
            lay an invincible summer.&quot; - Albert Camus
          </p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
