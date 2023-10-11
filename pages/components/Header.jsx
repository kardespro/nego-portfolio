import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { LuBox, LuBookMarked, LuPalmtree, LuMenu, LuX, LuFileBadge } from 'react-icons/lu';
import { useLockBodyScroll, useMedia, useToggle, useWindowScroll } from "react-use";
import { usePathname } from 'next/navigation';
import { twMerge } from "tailwind-merge";

export default function Header() {
  const pathname = usePathname();
  const links = [
    {
      text: 'nego.rocks',
      link: '/',
      icon: LuBox
    },
    {
      text: 'Yaptığım Websiteler',
      link: '/websites',
      icon: LuPalmtree
    },
    {
      text: 'Makaleler',
      link: '/articles',
      icon: LuBookMarked
    },
    {
      text: 'Instagram',
      link: 'https://instagram.com/forever.nihad',
      icon: LuFileBadge
    }
  ];

  const headerShouldCollapse = useMedia('(max-width: 470px)', false);
  const [menuIsOpen, toggleMenuIsOpen] = useToggle(false);
  useLockBodyScroll(menuIsOpen);
  const { y } = useWindowScroll();

  useEffect(() => {
    if (!headerShouldCollapse) return toggleMenuIsOpen(false);
  }, [headerShouldCollapse]);

  function NotCollapsedHeader() {
    return (
      <div className="mt-16 flex mb-1.5 gap-x-4  flex-wrap">
        {links.map((link, index) => (
          <Link href={link.link} key={index} className={twMerge(
            'my-3 text-base flex items-center gap-x-1 hover:bg-light-tertiary dark:bg-dark-tertiary px-3 mx-2 py-2 rounded-lg transition-all duration-300 ease-in-out font-medium text-light-tertiaryText dark:text-dark-tertiaryText hover:text-light-primaryText hover:dark:text-dark-primaryText select-none',
            pathname === link.link ? 'bg-light-tertiary dark:bg-dark-tertiary cursor-default text-light-primaryText dark:text-dark-primaryText' : 'bg-light-primary dark:bg-dark-primary cursor-pointer'
          )} onClick={e => pathname === link.link && e.preventDefault()}>
            {link.icon && <link.icon />}
            {link.text}
          </Link>
        ))}
      </div>
    );
  };

  function CollapsedHeader() {
    return (
      <div className="mt-16 flex mb-1.5">
        <Link href="/" className="my-3 text-base flex items-center gap-x-1 bg-light-tertiary dark:bg-dark-tertiary focus:opacity-50 px-3 mx-3 py-2 rounded-lg transition-all duration-300 ease-in-out font-medium text-light-tertiaryText dark:text-dark-tertiaryText hover:text-light-primaryText dark:text-dark-primaryText">
          <LuBox />
          nego.rocks
        </Link>

        <div onClick={toggleMenuIsOpen} className="my-3 text-base flex items-center gap-x-1 bg-light-tertiary dark:bg-dark-tertiary px-3 py-2 rounded-lg transition-all duration-300 ease-in-out font-medium text-light-tertiaryText dark:text-dark-tertiaryText hover:text-light-primaryText dark:text-dark-primaryText">
          {<LuMenu size={20} />}
        </div>
      </div>
    )
  };

  return (
    <>
      <AnimatePresence>
        {menuIsOpen && (
          <>
            <motion.div className="bg-black/60 w-full h-full absolute z-[10] top-0 left-0 min-h-[100dvh] flex justify-end" style={{ top: y }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
              <div className="pt-6 pr-6">
                <div onClick={toggleMenuIsOpen} className="text-base flex items-center gap-x-1 bg-light-tertiary dark:bg-dark-tertiary p-1.5 rounded-full transition-all duration-300 ease-in-out font-medium text-light-tertiaryText dark:text-dark-tertiaryText hover:text-light-primaryText dark:text-dark-primaryText">
                  {<LuX size={20} />}
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-light-secondary dark:bg-dark-secondary/20 rounded-tr-xl rounded-br-xl backdrop-blur w-full h-full max-w-[250px] absolute z-[11] top-0 left-0 min-h-[100dvh] flex flex-col p-4 gap-2.5" style={{ top: y }} initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -200 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
              {links.filter(link => link.link !== '/').map((link, index) => (
                <Link href={link.link} key={index} className="text-base flex items-center gap-x-1 bg-light-primary dark:bg-dark-primary/50 backdrop-blur px-3 py-2 rounded-lg transition-all duration-300 ease-in-out font-medium text-light-tertiaryText dark:text-dark-tertiaryText hover:text-light-primaryText dark:text-dark-primaryText">
                  {link.icon && <link.icon />}
                  {link.text}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {headerShouldCollapse ? <CollapsedHeader /> : <NotCollapsedHeader />}
    </>
  );
};
