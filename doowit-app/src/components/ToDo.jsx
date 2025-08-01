import moon from "../assets/moon.png"

export default function ToDo() {
    return (
        <div>
            <img src={moon} className={"img-fluid"} alt={"moon icon"}/>
            <h2>Shop Groceries</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec diam metus, tristique nec erat id,
                vehicula posuere orci. Praesent sit amet eleifend tortor. Aliquam dignissim convallis ornare. Etiam eget
                elit in risus laoreet sodales. Sed a iaculis mauris. Praesent imperdiet.</p>
        </div>
    )
}