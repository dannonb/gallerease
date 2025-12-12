import Link from "next/link";
import { Button } from "../ui/button";


  //#FFA457 orange
  //#DC5EB5 pink

  //#00ADF4 blue


export default function LandingHeading() {
  return (
    <section className="animate-fade-in">
      <div className="py-12 px-6 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-12">
        <div className="animate-slide-up">
          <Button asChild variant="outline" className="rounded-full p-2 mb-8 glass hover:shadow-glow transition-all duration-300">
            <Link
              href="#"
              className="inline-flex justify-between items-center py-2 px-2 pr-6 text-sm"
              role="alert"
            >
              <span className="text-xs bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white px-4 py-2 mr-3 shadow-soft">
                New
              </span>
              <span className="text-sm font-medium">
                Gallerease is out! See what&apos;s new
              </span>
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </Button>
        </div>
        
        <div className="animate-scale-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[96px] text-center font-bold w-full mx-auto mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-100 text-transparent bg-clip-text drop-shadow-sm">
              Gallerease
            </span>
            <br />
            <span className="text-foreground/80 text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              for Freelancers
            </span>
          </h1>
        </div>
        
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl md:text-2xl text-center w-full max-w-3xl mx-auto mb-12 text-muted-foreground leading-relaxed">
            Collaborate with clients to make gallery management a quick and easy
            process. Streamline your workflow with modern tools.
          </p>
        </div>
        
        <div className="flex flex-col mb-8 lg:mb-12 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" variant="gradient" className="group">
            <Link href="/getting-started" className="text-base">
              Get Started
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="group">
            <Link href="#" className="inline-flex text-base">
              <svg
                className="mr-2 w-5 h-5 transition-transform group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
              Watch Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
