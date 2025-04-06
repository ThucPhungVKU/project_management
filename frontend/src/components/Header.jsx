import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">TechStore</span>
            </Link>
          </div>

          <div className="flex items-center">
            <Link to="/cart" className="p-2 rounded-md text-gray-600 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>

            {isAuthenticated ? (
              <Menu as="div" className="ml-3 relative">
                <Menu.Button className="p-2 rounded-md text-gray-600 hover:text-gray-900">
                  <UserIcon className="h-6 w-6" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg">
                    <Menu.Item>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Orders
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link to="/login" className="ml-3 text-sm text-gray-600 hover:text-gray-900">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}