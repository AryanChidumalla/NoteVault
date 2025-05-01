import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../Components/MuiComponents";
import { Table } from "./Table";
import { CoffeeMachine } from "./CoffeeMachine";
import QuoteImg from "../../img/Quote.svg";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-SoftWhite">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-6 bg-LightAqua border-b-2 border-SoftBlack">
        <div className="font-bold text-2xl">NoteVault</div>
        <StyledButton
          label={"Sign In"}
          onClick={() => {
            navigate("/register");
          }}
        />
      </div>

      {/* HeroSection */}
      <div className="flex flex-col md:flex-row gap-12 py-20 px-6 md:px-12 lg:px-20 items-center">
        <div className="flex-1 flex flex-col gap-10">
          <div className="font-bold text-5xl">
            Capture Your Thoughts, Organize Your Ideas
          </div>
          <div className="text-base">
            Effortlessly jot down notes, collaborate with others, and unlock
            your creativity with our intuitive note-taking platform.
          </div>
          <div>
            <StyledButton
              label={"Get Started"}
              onClick={() => {
                navigate("/register");
              }}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/5">
          {/* Removed ResponsiveTable and added conditional rendering */}
          <div className="hidden sm:block">
            <Table />
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="flex flex-col md:flex-row gap-12 py-20 px-6 md:px-12 lg:px-20 items-center">
        <div className="w-full md:w-1/2 ">
          {/* Removed ResponsiveCoffeeMachine and added conditional rendering */}
          <div className="hidden sm:block">
            <CoffeeMachine />
          </div>
        </div>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-5 justify-center">
            <div className="font-bold text-5xl">
              Introduction to NoteVault Platform.
            </div>
            <div className="text-base">
              In today’s fast-paced digital world, effective note-taking is
              essential for students, professionals, and anyone looking to
              organize their thoughts and ideas. Our platform revolutionizes the
              traditional approach to note-taking by offering a flexible,
              intuitive, and powerful digital solution.
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="font-bold text-5xl">Why NoteVault Matters.</div>
            <div className="text-base">
              Taking notes is not just about recording information; it is a
              crucial learning strategy that enhances retention and
              comprehension. By capturing key points from lectures, meetings, or
              personal reflections, users can free their minds from the burden
              of remembering every detail. This practice allows for better
              organization of thoughts and promotes active engagement with the
              material.
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="flex flex-col gap-10 py-20 px-6 md:px-12 lg:px-20">
        <div className="font-bold text-5xl">Key Features.</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-5 p-6 bg-SoftWhite border-2 border-SoftBlack rounded-lg">
            <div className="font-bold text-xl">Quick Capture and Editing.</div>
            <div className="text-base">
              Easily capture thoughts, ideas, and information from any source
              with minimal effort. Users can quickly jot down notes without
              navigating complex menus.
            </div>
          </div>

          <div className="flex flex-col gap-5 p-6 bg-SoftWhite border-2 border-SoftBlack rounded-lg">
            <div className="font-bold text-xl">
              Advanced Search Functionality.
            </div>
            <div className="text-base">
              Quickly find notes by searching through titles, content, and
              metadata. Features like auto-complete enhance the search
              experience.
            </div>
          </div>

          <div className="flex flex-col gap-5 p-6 bg-SoftWhite border-2 border-SoftBlack rounded-lg">
            <div className="font-bold text-xl">Cloud Syncing.</div>
            <div className="text-base">
              Notes are automatically synchronized across all devices, ensuring
              users can access their information anytime, even offline.
            </div>
          </div>

          <div className="flex flex-col gap-5 p-6 bg-SoftWhite border-2 border-SoftBlack rounded-lg">
            <div className="font-bold text-xl">Quick Capture and Editing.</div>
            <div className="text-base">
              Easily capture thoughts, ideas, and information from any source
              with minimal effort. Users can quickly jot down notes without
              navigating complex menus.
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="flex flex-col gap-10 py-20 px-6 md:px-12 lg:px-20">
        <div className="font-bold text-5xl">Testimonials.</div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col gap-5 border-2 border-SoftBlack rounded-lg p-6 flex-1">
            <img className="w-16 h-16" src={QuoteImg} alt="" />
            <div className="text-base">
              As a university student, I struggled to keep my notes organized
              and accessible. Since I started using this note-taking website, my
              study sessions have become much more efficient. The ability to
              categorize and search my notes has saved me countless hours. I can
              easily find exactly what I need for exams, and my grades have
              improved significantly!
            </div>
            <div className="font-bold text-sm">
              Sarah T., University Student.
            </div>
          </div>

          <div className="flex flex-col gap-5 border-2 border-SoftBlack rounded-lg p-6 flex-1">
            <img className="w-16 h-16" src={QuoteImg} alt="" />
            <div className="text-base">
              In my role as a project manager, effective note-taking is crucial.
              This website has transformed how I capture and share meeting notes
              with my team. The collaborative features allow us to work together
              seamlessly, ensuring everyone is on the same page. It’s a
              game-changer for our productivity!
            </div>
            <div className="font-bold text-sm">Mark R., Project Manager.</div>
          </div>

          <div className="flex flex-col gap-5 border-2 border-SoftBlack rounded-lg p-6 flex-1">
            <img className="w-16 h-16" src={QuoteImg} alt="" />
            <div className="text-base">
              As a writer, I often have ideas that come to me at random times.
              This note-taking website allows me to jot down thoughts quickly
              and organize them into projects later. The user-friendly interface
              and tagging system make it easy to retrieve my ideas when I need
              them most. It’s become an essential tool in my writing process!
            </div>
            <div className="font-bold text-sm">Emily J., Freelance Writer.</div>
          </div>
        </div>
      </div>

      <div className="flex justify-start py-6 px-6 md:px-12 lg:px-20 bg-SoftBlack">
        <div className="font-bold text-2xl text-SoftWhite">NoteVault</div>
      </div>
    </div>
  );
};
