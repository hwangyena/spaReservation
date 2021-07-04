// styled-jsx 예시

const Footer = () => {
  return (
    <footer >
      <span>
        © 2021 ITEZ
      </span>
      <span>
        👍
      </span>
      <style jsx>
        {`
          footer {
            height: 100px;
            background: var(--secendary);
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </footer>
  )
}

export default Footer
