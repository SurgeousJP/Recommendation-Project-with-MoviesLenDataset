import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

interface Props {
  children?: React.ReactNode;
}
export default function Register({ children }: Props) {
  return (
    <div id='outer-container'>
      <Header />
      <div id='page-wrap'>{children}</div>
      <Footer />
    </div>
  );
}
