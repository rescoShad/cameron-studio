import { Composition } from "remotion";
import { WelcomeToReiSearch } from "./compositions/WelcomeToReiSearch";
import { HelloWorld } from "./compositions/HelloWorld";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="WelcomeToReiSearch"
        component={WelcomeToReiSearch}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
