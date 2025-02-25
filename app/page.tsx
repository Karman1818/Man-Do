import {Navbar} from "@/app/components/navbar";
import {TitleScreen} from "@/app/components/titlescreen";
import {TitleScreenButton} from "@/app/components/titlescreenbutton";

export default function Home() {
  return (
      <>
          <Navbar></Navbar>
          <TitleScreen></TitleScreen>
          <div className="flex space-x-4 justify-center">
              <TitleScreenButton text={"Get Started"}/>
              <TitleScreenButton text={"Track Your Progress"}/>
          </div>


      </>
  );
}
