import {Navbar} from "@/app/components/navbar";
import {TitleScreen} from "@/app/components/titlescreen";
import {TitleScreenButton} from "@/app/components/titlescreenbutton";
import Link from "next/link";


export default function Home() {
  return (
      <>
          <Navbar></Navbar>
          <TitleScreen></TitleScreen>
          <div className="flex space-x-4 justify-center">

              <Link href={"/register"}>
                         <TitleScreenButton text={"Get Started"}/>
              </Link>

              <Link href={"/activity"}>
                  <TitleScreenButton text={"Track Your Progress"}/>
              </Link>
          </div>


      </>
  );
}
