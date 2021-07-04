// css-module with classnames 예시

import Link from 'next/link'
import css from './header.module.css'
import classNames from 'classnames/bind'
import Image from 'next/image';

const cn = classNames.bind(css);

const Header = () => {
  return (
    <header className={cn('container')}>
      <div className={cn('inner', 'row-flex')}>
        <div className={cn('row-flex')}>
          <Link href={'/'}>
            <a>
              <Image
                src={'/vercel.svg'}
                layout={'fixed'}
                width={100}
                height={30}
              />
            </a>
          </Link>
        </div>
        <div>Login</div>
      </div>
    </header >
  )
}

export default Header
