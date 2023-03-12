#include<bits/stdc++.h>
#include <ext/pb_ds/assoc_container.hpp>

using namespace __gnu_pbds;
using namespace std;

typedef tree<int,null_type,less<int>,rb_tree_tag,
tree_order_statistics_node_update> indexed_set;
#define iset indexed_set
#define ll long long int
#define ull unsigned long long int
#define int ll
#define f first
#define sec second
#define rep(i, st, end) for(int i = st; i < end; i++)
const int mod = 1e9 + 7;
using ii = pair<int, int>;

void solve()
{
	int N, T;
	cin >> N >> T;
	vector<int> v(N);
	int sum = 0;
	for(int i = 0; i<N; i++)
	{
		int temp;
		cin >> temp;
		v[i] = temp;
		sum += temp;
	}

	vector<int> pre(N);
	pre[0] = v[0];

	for(int i = 1; i<N; i++)
	{
		pre[i] = pre[i-1] + v[i];
	}

	int ind = T%sum;

	vector<int>::iterator ans1;
	ans1 = lower_bound(pre.begin(), pre.end(), ind);
	cout << (ans1 - pre.begin()+1) << " ";

	if((ans1 - pre.begin()+1) == 1)
	{
		cout << ind << '\n';
	}

	else
	{
		int index = (int)(ans1 - pre.begin()-1);
		int ans2 = ind - pre[index];
		cout << ans2 << '\n';
	}

}

signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    //int t; cin>>t; while(t--)
    solve();
}