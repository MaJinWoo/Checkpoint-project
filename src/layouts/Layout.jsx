import NavigationBar from './NavigationBar';

export default function Layout(props) {
  return (
    <div>
      <NavigationBar />
      <main>{props.children}</main>
    </div>
  );
}
