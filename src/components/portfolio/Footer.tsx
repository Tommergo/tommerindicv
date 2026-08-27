const Footer = () => (
  <footer className="py-8 border-t border-border bg-card">
    <div className="container mx-auto px-4 text-center">
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Tomer Goldstein. Built with passion and data.
      </p>
    </div>
  </footer>
);

export default Footer;
