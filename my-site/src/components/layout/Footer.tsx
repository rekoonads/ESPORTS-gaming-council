export default function Footer() {
  return (
    <footer className="border-t py-8 mt-10">
      <div className="container text-center text-sm opacity-60">
        © {new Date().getFullYear()} GameHub. All rights reserved.
      </div>
    </footer>
  );
}