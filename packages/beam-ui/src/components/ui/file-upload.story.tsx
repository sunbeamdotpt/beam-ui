import { FileUpload } from "./file-upload.tsx";

export default function FileUploadStory() {
  return (
    <div style={{ maxWidth: 480 }}>
      <FileUpload
        onFiles={(files) => console.log("Files:", files)}
        accept="image/*,.pdf"
        multiple
      />
    </div>
  );
}

export function SingleFile() {
  return <div style={{ maxWidth: 480 }}><FileUpload onFiles={() => {}} /></div>;
}

export function Disabled() {
  return <div style={{ maxWidth: 480 }}><FileUpload onFiles={() => {}} disabled /></div>;
}

export function ImagesOnly() {
  return <div style={{ maxWidth: 480 }}><FileUpload onFiles={() => {}} accept="image/*" multiple /></div>;
}

export function Multiple() {
  return <div style={{ maxWidth: 480 }}><FileUpload onFiles={() => {}} multiple /></div>;
}
