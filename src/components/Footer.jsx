import React from 'react'

function Footer() {
  return (
    <>
    <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">About Us</h3>
              <p className="text-gray-400">
                Transforming agricultural waste into sustainable solutions for a better tomorrow.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Farming Street</li>
                <li>Agricultural District</li>
                <li>contact@example.com</li>
                <li>+1 234 567 890</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Agricultural Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
    </>
  )
}

export default Footer
