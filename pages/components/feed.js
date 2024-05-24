export default function Feed() {
  return (
    <aside className="control-sidebar control-sidebar-light display-block">
      <div className="p-3">
        <h5>Activity Feeds</h5>

        <ul class="products-list">
          <li class="item">
            <div class="product-info">
              <div className="clearfix">
                <span class="badge badge-success">Trade Complete</span>
                <span className="small float-right">A minute ago</span>
              </div>

              <span class="product-description">
                <a href="" className="underline">
                  TFN Mini Portfolio
                </a>{" "}
                closed a long position in MICRO WTI CRUDE OIL JUNE 2024 for a
                hypothetical profit of $16
              </span>
            </div>
          </li>
          <li class="item">
            <div class="product-info">
              <div className="clearfix">
                <span class="badge badge-info">New Follower</span>
                <span className="small float-right">3 hours ago</span>
              </div>

              <span class="product-description">
                <a href="" className="underline">
                  User Name
                </a>{" "}
                subscribed to{" "}
                <a href="/detailslist" className="underline">
                  WS Value
                </a>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
