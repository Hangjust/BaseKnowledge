"use client";

import { useState } from "react";

export default function AdminMediaUploader({ disabled }: { disabled: boolean }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setUploadedUrl("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Media upload failed.");
      }

      setUploadedUrl(payload.url);
      event.currentTarget.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Media upload failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <fieldset className="form-grid" disabled={disabled || isLoading}>
        <div className="field">
          <label htmlFor="file">Diagram or learning image</label>
          <input accept="image/png,image/jpeg,image/webp" id="file" name="file" required type="file" />
        </div>
        <button className="button" type="submit">
          {isLoading ? "Uploading..." : "Upload media"}
        </button>
      </fieldset>

      {error ? <div className="status error">{error}</div> : null}
      {uploadedUrl ? (
        <div className="status success">
          Uploaded: <a href={uploadedUrl}>{uploadedUrl}</a>
        </div>
      ) : null}
    </form>
  );
}
