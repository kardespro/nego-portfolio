import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Tippy from '@tippyjs/react';
import { motion } from 'framer-motion';
import SpotifyActivity from './SpotifyActivity';
import InlineLink from './InlineLink';

export default function AboutMe({ discord_data, activityData }) {
  return (
    <div className="mx-6 mt-28 flex flex-col">
      <div className="w-20 h-20 bg-light-secondary dark:bg-dark-secondary rounded-full relative">
        <Image src='/homeAvatar.png' alt="Home Avatar" width={626} height={626} priority={true} />
        <div className='absolute bottom-1.5 right-1.5'>
          <Tippy content={<>
            <div className='flex gap-x-2 items-center'>
              <Image src={`https://cdn.discordapp.com/avatars/${discord_data?.discord_user.id}/${discord_data?.discord_user.avatar}.png`} width={128} height={128} className='rounded-full h-[28px] w-[28px]' alt="Discord Avatar" />
              <div className='flex flex-col'>
                <InlineLink className='font-medium text-light-primaryText dark:text-dark-primaryText hover:underline' to={`https://discord.com/users/${discord_data?.discord_user.id}`} underlineDisabled={true}>@{discord_data?.discord_user.username}</InlineLink>
                <span className='text-light-secondaryText dark:text-dark-secondaryText text-xs flex items-center gap-x-1'>
                  <motion.span className={twMerge(
                    'w-2 h-2 rounded-full block',
                    `bg-discordStatus-${discord_data?.discord_status}` // bg-discordStatus-online bg-discordStatus-offline bg-discordStatus-dnd bg-discordStatus-idle
                  )} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: .2 }} />
                  {discord_data?.discord_status.replace('online', 'Çevrimiçi').replace('offline', 'Çevrimdışı').replace('dnd', 'Rahatsız Etmeyin').replace('idle', 'Çevrimiçi')}
                </span>
              </div>
            </div>
          </>} inertia={true} interactive={true}>
            <motion.span className={twMerge(
              'w-3 h-3 rounded-full block',
              `bg-discordStatus-${discord_data?.discord_status}`
            )} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: .2 }} />
          </Tippy>
        </div>
      </div>

      <div className="mt-4">
        <h2 className='text-2xl font-medium text-light-primaryText dark:text-dark-primaryText'>
          Full-stack developer
        </h2>

        <p className='mt-4 text-lg text-light-secondaryText dark:text-dark-secondaryText font-normal'>
          Nihad, 16 yaşında, Bakü. Kodlama, Discord.js ve React. Freelance. Sosyal değil.
        </p>

        <SpotifyActivity activityData={activityData} />
      </div>
    </div>
  );
};
