// css-module with classnames 예시

import Link from 'next/link'
import css from './header.module.css'
import classNames from 'classnames/bind'
import Image from 'next/image';

const cx = classNames.bind(css);

const Header = () => {
  return (
    <header className={cx('container')}>
      <div className={cx('inner', 'row-flex')}>
        <div className={cx('row-flex')}>
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
      {/* <Link href={'/'} shallow>
        홈
      </Link>
      <Link href={'/counter'} shallow>
        카운터로 이동
      </Link> */}
    </header >
  )
}

export default Header
