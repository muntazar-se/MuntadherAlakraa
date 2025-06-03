export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="w-full py-8 mt-20">
        <div className="flex flex-col items-center">
          {/* Gradient Line */}
          <div className="w-4/5 h-px mb-8" 
            style={{
              background: "linear-gradient(90deg, #13ADC7, #6978D1, #945DD6)"
            }}
          />
          
          {/* Footer Content */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-center px-8 lg:px-16">
            {/* Logo/Name */}
            <div className="mb-6 lg:mb-0">
              <h2 className="font-bold text-xl text-white">Muntadher Al-Akraa</h2>
              <p className="text-gray-400 text-sm mt-1">Frontend Developer</p>
            </div>
            
            {/* Site Links */}
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-12 mb-6 lg:mb-0">
              <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#technologies" className="text-gray-300 hover:text-white transition-colors">
                Technologies
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://twitter.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaXTwitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 text-gray-500 text-sm">
            <p>© {currentYear} Muntadher Al-Akraa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
