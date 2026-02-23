import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { lazy, Suspense } from "react";

const FlashcardsGame = lazy(() => import("@/components/games/FlashcardsGame"));
const SpeedTypingGame = lazy(() => import("@/components/games/SpeedTypingGame"));
const TroubleshootingChallenge = lazy(() => import("@/components/games/TroubleshootingChallenge"));

const gameMap: Record<string, { title: string; component: React.LazyExoticComponent<React.ComponentType> }> = {
  flashcards: { title: "Component Flashcards", component: FlashcardsGame },
  "speed-typing": { title: "Speed Typing: Commands", component: SpeedTypingGame },
  troubleshooting: { title: "Timed Troubleshooting", component: TroubleshootingChallenge },
};

const GamePlayPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const game = gameId ? gameMap[gameId] : null;

  if (!game) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pb-24 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">Game not found</h1>
        <Link to="/games" className="mt-4 text-sm text-primary underline">Back to Games</Link>
      </div>
    );
  }

  const GameComponent = game.component;

  return (
    <div className="pb-24">
      <div className="border-b border-border bg-card/80 backdrop-blur-sm px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Link to="/games" className="rounded-lg p-1.5 hover:bg-secondary transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <h1 className="font-display font-semibold text-foreground">{game.title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-6">
        <Suspense fallback={<div className="text-center py-10 text-muted-foreground text-sm">Loading game...</div>}>
          <GameComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default GamePlayPage;
