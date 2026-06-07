import Link from "next/link";
import AdminMediaUploader from "@/components/AdminMediaUploader";
import AdminSignOut from "@/components/AdminSignOut";
import { requireAdmin } from "@/lib/admin";
import { getCloudinaryConfigIssue, hasCloudinaryConfig } from "@/lib/env";

export default async function AdminMediaPage() {
  await requireAdmin();
  const configIssue = getCloudinaryConfigIssue();
  const canUpload = hasCloudinaryConfig() && !configIssue;

  return (
    <main className="page">
      <section className="section">
        <p className="eyebrow">Admin / Media</p>
        <h1>Upload learning media.</h1>
        <div className="toolbar">
          <Link className="ghost-button" href="/admin">
            Back to dashboard
          </Link>
          <AdminSignOut />
        </div>
      </section>

      <div className="admin-layout">
        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="/admin">Topics</Link>
          <Link href="/admin/media">Media</Link>
          <Link href="/">Public site</Link>
        </nav>

        <section className="admin-panel">
          <h2>Cloudinary uploads</h2>
          {!canUpload ? (
            <div className="status error">
              {configIssue ?? "Cloudinary is not configured. Set Cloudinary environment variables to upload admin media."}
            </div>
          ) : null}
          <p className="muted">
            Upload diagrams and illustrations, then use the returned URL in lesson content or topic resources.
          </p>
          <AdminMediaUploader disabled={!canUpload} />
        </section>
      </div>
    </main>
  );
}
