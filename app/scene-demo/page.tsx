import Image from "next/image";
import SmoothScroll from "../components/SmoothScroll";
import Scene from "../components/Scene";
import SceneController from "../components/SceneController";

export default function SceneDemoPage() {
  return (
    <main className="scene-system-root">
      <SmoothScroll />
      <SceneController />

      <div className="scene-deck">
        <Scene theme="black" id="demo-hero">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">00 / HERO</p>
              <h1 className="scene-title">
                WE BUILD
                <br />
                <span className="scene-accent">MOMENTUM.</span>
              </h1>
              <p>
                Test scény, centeringu, clippingu, snappingu a globálneho
                farebného canvasu.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true">
              <Image
                src="/01-astronaut-launch.png"
                alt=""
                width={900}
                height={900}
                priority
              />
            </div>
          </div>
        </Scene>

        <Scene theme="cream">
          <div className="scene-copy">
            <p className="scene-kicker">01 / APPROACH</p>
            <h2 className="scene-title">
              DIZAJN,
              <br />
              KTORÝ
              <br />
              <span className="scene-accent">KOMUNIKUJE.</span>
            </h2>
            <p>
              Všimni si hlavne plynulý prechod black → cream bez overlayu
              medzi sekciami.
            </p>
          </div>
        </Scene>

        <Scene theme="orange">
          <div className="scene-split scene-split-reverse">
            <div className="scene-copy">
              <p className="scene-kicker">02 / TECHNOLOGY</p>
              <h2 className="scene-title">
                TECHNOLÓGIA,
                <br />
                KTORÁ ŠETRÍ
                <br />
                <span className="scene-accent">ČAS.</span>
              </h2>
              <p>
                Ilustrácia zostáva fyzicky vo svojej scéne a nemôže pretiecť
                do ďalšieho bloku.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true">
              <Image
                src="/03-web-ui-orbit.png"
                alt=""
                width={900}
                height={900}
              />
            </div>
          </div>
        </Scene>

        <Scene theme="blue">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">08 / NO STRINGS ATTACHED</p>
              <h2 className="scene-title">
                BEZPLATNÁ
                <br />
                <span className="scene-accent">KONZULTÁCIA.</span>
              </h2>
              <p>
                Prvý výrazný electric-blue moment vo finálnej homepage.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true">
              <Image
                src="/11-consultation-orbit.png"
                alt=""
                width={900}
                height={900}
              />
            </div>
          </div>
        </Scene>

        <Scene theme="cream">
          <div className="scene-split scene-split-reverse">
            <div className="scene-copy">
              <p className="scene-kicker">09 / CLEAR FROM DAY ONE</p>
              <h2 className="scene-title">
                JASNÁ
                <br />
                CENOVÁ
                <br />
                <span className="scene-accent">PONUKA.</span>
              </h2>
              <p>
                Kontrastná pokojná scéna po sýtej modrej. Neskôr sem napojíme
                celý nový consultation → proposal flow.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true">
              <Image
                src="/12-project-blueprint.png"
                alt=""
                width={900}
                height={900}
              />
            </div>
          </div>
        </Scene>

        <Scene theme="purple">
          <div className="scene-split">
            <div className="scene-copy">
              <p className="scene-kicker">14 / PLAYGROUND</p>
              <h2 className="scene-title">
                GRAVITY
                <br />
                IS JUST A
                <br />
                <span className="scene-accent">SUGGESTION.</span>
              </h2>
              <p>
                Zatiaľ statický Gravity Core. V ďalšej fáze okolo neho
                postavíme interaktívny Canvas / Gravity Lab.
              </p>
            </div>

            <div className="scene-art scene-safe" aria-hidden="true">
              <Image
                src="/13-gravity-core.png"
                alt=""
                width={900}
                height={900}
              />
            </div>
          </div>
        </Scene>

        <Scene theme="orange">
          <div className="scene-copy">
            <p className="scene-kicker">16 / FINAL CTA</p>
            <h2 className="scene-title">
              READY
              <br />
              FOR
              <br />
              <span className="scene-accent">LAUNCH?</span>
            </h2>
            <p>
              Ak sa scroll zastavuje presne na scénach a farby pôsobia
              prirodzene, Step 2 máme potvrdený.
            </p>
          </div>
        </Scene>
      </div>
    </main>
  );
}
