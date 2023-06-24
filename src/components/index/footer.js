import '../../css/footer.css'
function Footer() {
    return (<footer id="mu-footer" role="contentinfo">
        <div className="container">
            <div className="mu-footer-area">
                <div className="mu-social-media">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-google-plus"></i></a>
                    <a href="https://www.linkedin.com/in/mahmoud-hassan-8a4a94274/"><i className="fa fa-linkedin"></i></a>
                </div>
                <p className="mu-copyright">&copy; Copyright <a rel="#" href="">M7moudHassan.io</a>. All right reserved.</p>
            </div>
        </div>
    </footer>)
}
export default Footer;