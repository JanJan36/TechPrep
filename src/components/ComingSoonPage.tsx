import { Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface ComingSoonPageProps {
  title: string;
  description: string;
}

const ComingSoonPage = ({ title, description }: ComingSoonPageProps) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pb-24 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
      <Construction className="h-8 w-8 text-muted-foreground" />
    </div>
    <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
    <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
    <Link
      to="/"
      className="mt-6 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
    >
      Back to Dashboard
    </Link>
  </div>
);

export default ComingSoonPage;
