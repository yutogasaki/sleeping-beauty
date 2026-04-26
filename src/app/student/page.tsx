import type { Metadata } from "next";
import Link from "next/link";
import MessageSubmissionForm from "../../components/MessageSubmissionForm";
import { EVENT_DETAILS } from "../../lib/eventDetails";

export const metadata: Metadata = {
  title: `生徒用 意気込み投稿 | ${EVENT_DETAILS.productionTitle}`,
  description: "発表会に向けた意気込みを送る生徒用ページです。",
};

export default function StudentPage() {
  return (
    <main className="student-page">
      <div className="student-page__backdrop" aria-hidden="true" />
      <section className="student-page__shell">
        <div className="student-page__copy">
          <p className="student-page__eyebrow">Student entrance</p>
          <h2>{EVENT_DETAILS.productionTitle}</h2>
          <p>
            舞台に向かう気持ちを、ひとつの光として森へ届けます。
            送信後は運営の確認を経て、公開ページに灯ります。
          </p>
          <Link href="/" className="student-page__home-link">
            公開ページへ戻る
          </Link>
        </div>
        <div className="student-page__form-panel glass-panel">
          <MessageSubmissionForm />
        </div>
      </section>
    </main>
  );
}
