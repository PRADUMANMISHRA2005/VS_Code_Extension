export const snippetCodes = {
  cpp: {
    binary_search: `#include <bits/stdc++.h>
using namespace std;

// Binary Search
int binarySearch(vector<int>& a, int x) {
    int l = 0;
    int r = (int)a.size() - 1;

    while (l <= r) {
        int m = l + (r - l) / 2;

        if (a[m] == x) {
            return m;
        }

        if (a[m] < x) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }

    return -1;
}

int main() {
    vector<int> a = {1, 3, 5, 7, 9};
    cout << binarySearch(a, 7) << "\\n"; // 3
    cout << binarySearch(a, 4) << "\\n"; // -1
    return 0;
}
`,

    dsu: `#include <bits/stdc++.h>
using namespace std;

// DSU
class DSU {
private:
    vector<int> parent;
    vector<int> sz;

public:
    DSU(int n) {
        parent.resize(n + 1);
        sz.assign(n + 1, 1);
        iota(parent.begin(), parent.end(), 0);
    }

    int find(int x) {
        if (parent[x] == x) {
            return x;
        }

        return parent[x] = find(parent[x]);
    }

    bool unite(int a, int b) {
        a = find(a);
        b = find(b);

        if (a == b) {
            return false;
        }

        if (sz[a] < sz[b]) {
            swap(a, b);
        }

        parent[b] = a;
        sz[a] += sz[b];

        return true;
    }
};

int main() {
    DSU dsu(5);
    dsu.unite(1, 2);
    dsu.unite(3, 4);
    cout << (dsu.find(1) == dsu.find(2)) << "\\n"; // 1
    cout << (dsu.find(1) == dsu.find(3)) << "\\n"; // 0
    return 0;
}
`,

    dijkstra: `#include <bits/stdc++.h>
using namespace std;

// Dijkstra
vector<long long> dijkstra(
    int n,
    vector<vector<pair<int, int>>>& adj,
    int src
) {
    const long long INF = 1e18;

    vector<long long> dist(n + 1, INF);

    priority_queue<
        pair<long long, int>,
        vector<pair<long long, int>>,
        greater<pair<long long, int>>
    > pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d != dist[u]) {
            continue;
        }

        for (auto [v, w] : adj[u]) {
            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }

    return dist;
}

int main() {
    int n = 4;
    vector<vector<pair<int, int>>> adj(n + 1);
    adj[1].push_back({2, 1});
    adj[1].push_back({3, 4});
    adj[2].push_back({3, 2});
    adj[3].push_back({4, 1});

    auto dist = dijkstra(n, adj, 1);

    for (int i = 1; i <= n; i++) {
        cout << "dist[" << i << "] = " << dist[i] << "\\n";
    }

    return 0;
}
`,

    segment_tree: `#include <bits/stdc++.h>
using namespace std;

// Segment Tree
class SegTree {
private:
    vector<long long> tree;
    int n;

public:
    SegTree(int sz) {
        n = sz;
        tree.assign(4 * n, 0);
    }

    void update(int node, int l, int r, int idx, long long val) {
        if (l == r) {
            tree[node] = val;
            return;
        }

        int mid = (l + r) / 2;

        if (idx <= mid) {
            update(2 * node, l, mid, idx, val);
        } else {
            update(2 * node + 1, mid + 1, r, idx, val);
        }

        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    long long query(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) {
            return 0;
        }

        if (ql <= l && r <= qr) {
            return tree[node];
        }

        int mid = (l + r) / 2;

        return query(2 * node, l, mid, ql, qr)
             + query(2 * node + 1, mid + 1, r, ql, qr);
    }
};

int main() {
    int n = 5;
    SegTree st(n);
    st.update(1, 1, n, 1, 3);
    st.update(1, 1, n, 3, 7);
    st.update(1, 1, n, 5, 2);
    cout << st.query(1, 1, n, 1, 5) << "\\n"; // 12
    cout << st.query(1, 1, n, 1, 3) << "\\n"; // 10
    return 0;
}
`,

    fenwick: `#include <bits/stdc++.h>
using namespace std;

// Fenwick Tree
class Fenwick {
private:
    vector<long long> bit;
    int n;

public:
    Fenwick(int sz) {
        n = sz;
        bit.assign(n + 1, 0);
    }

    void add(int idx, long long val) {
        while (idx <= n) {
            bit[idx] += val;
            idx += idx & -idx;
        }
    }

    long long sum(int idx) {
        long long ans = 0;

        while (idx > 0) {
            ans += bit[idx];
            idx -= idx & -idx;
        }

        return ans;
    }
};

int main() {
    Fenwick fen(5);
    fen.add(1, 3);
    fen.add(3, 7);
    fen.add(5, 2);
    cout << fen.sum(5) << "\\n"; // 12
    cout << fen.sum(3) << "\\n"; // 10
    return 0;
}
`,

    sieve: `#include <bits/stdc++.h>
using namespace std;

// Sieve
vector<bool> sieve(int n) {
    vector<bool> prime(n + 1, true);

    if (n >= 0) {
        prime[0] = false;
    }

    if (n >= 1) {
        prime[1] = false;
    }

    for (int i = 2; i * i <= n; i++) {
        if (prime[i]) {
            for (int j = i * i; j <= n; j += i) {
                prime[j] = false;
            }
        }
    }

    return prime;
}

int main() {
    auto prime = sieve(20);

    for (int i = 2; i <= 20; i++) {
        if (prime[i]) {
            cout << i << " ";
        }
    }

    cout << "\\n"; // 2 3 5 7 11 13 17 19
    return 0;
}
`,

    modexp: `#include <bits/stdc++.h>
using namespace std;

// Modular Exponentiation
long long modPow(long long a, long long b, long long mod) {
    long long ans = 1;

    while (b > 0) {
        if (b & 1) {
            ans = ans * a % mod;
        }

        a = a * a % mod;
        b >>= 1;
    }

    return ans;
}

int main() {
    cout << modPow(2, 10, 1e9 + 7) << "\\n"; // 1024
    cout << modPow(3, 5, 13)       << "\\n"; // 9
    return 0;
}
`,

    kmp: `#include <bits/stdc++.h>
using namespace std;

// KMP Prefix Function
vector<int> prefixFunction(string s) {
    int n = s.size();
    vector<int> pi(n);

    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];

        while (j > 0 && s[i] != s[j]) {
            j = pi[j - 1];
        }

        if (s[i] == s[j]) {
            j++;
        }

        pi[i] = j;
    }

    return pi;
}

int main() {
    string s = "aabxaa";
    auto pi = prefixFunction(s);

    for (int x : pi) {
        cout << x << " ";
    }

    cout << "\\n"; // 0 1 0 0 1 2
    return 0;
}
`,

    mod_arithmetic: `#include <bits/stdc++.h>
using namespace std;

// Modular Arithmetic
const long long MOD = 1e9 + 7;

long long add(long long a, long long b) {
    return (a + b) % MOD;
}

long long sub(long long a, long long b) {
    return ((a - b) % MOD + MOD) % MOD;
}

long long mul(long long a, long long b) {
    return (a % MOD) * (b % MOD) % MOD;
}

long long modPow(long long a, long long b, long long mod) {
    long long ans = 1;

    while (b > 0) {
        if (b & 1) {
            ans = ans * a % mod;
        }

        a = a * a % mod;
        b >>= 1;
    }

    return ans;
}

long long inv(long long a) {
    return modPow(a, MOD - 2, MOD);
}

long long divide(long long a, long long b) {
    return mul(a, inv(b));
}

int main() {
    cout << add(1e9 + 5, 5)  << "\\n"; // 3
    cout << sub(3, 5)         << "\\n"; // 1000000005
    cout << mul(1e9 + 6, 2)  << "\\n"; // 1000000005
    cout << divide(10, 2)     << "\\n"; // 5
    return 0;
}
`,

    trie: `#include <bits/stdc++.h>
using namespace std;

// Trie
class Trie {
private:
    struct Node {
        int children[26];
        bool isEnd;

        Node() {
            fill(children, children + 26, -1);
            isEnd = false;
        }
    };

    vector<Node> nodes;

public:
    Trie() {
        nodes.push_back(Node());
    }

    void insert(const string& s) {
        int cur = 0;

        for (char c : s) {
            int ch = c - 'a';

            if (nodes[cur].children[ch] == -1) {
                nodes[cur].children[ch] = nodes.size();
                nodes.push_back(Node());
            }

            cur = nodes[cur].children[ch];
        }

        nodes[cur].isEnd = true;
    }

    bool search(const string& s) {
        int cur = 0;

        for (char c : s) {
            int ch = c - 'a';

            if (nodes[cur].children[ch] == -1) {
                return false;
            }

            cur = nodes[cur].children[ch];
        }

        return nodes[cur].isEnd;
    }

    bool startsWith(const string& s) {
        int cur = 0;

        for (char c : s) {
            int ch = c - 'a';

            if (nodes[cur].children[ch] == -1) {
                return false;
            }

            cur = nodes[cur].children[ch];
        }

        return true;
    }
};

int main() {
    Trie trie;
    trie.insert("apple");
    trie.insert("app");
    cout << trie.search("apple")      << "\\n"; // 1
    cout << trie.search("app")        << "\\n"; // 1
    cout << trie.search("ap")         << "\\n"; // 0
    cout << trie.startsWith("ap")     << "\\n"; // 1
    return 0;
}
`,

    topological_sort: `#include <bits/stdc++.h>
using namespace std;

// Topological Sort (Kahn's Algorithm)
vector<int> topoSort(int n, vector<vector<int>>& adj) {
    vector<int> indegree(n + 1, 0);

    for (int u = 1; u <= n; u++) {
        for (int v : adj[u]) {
            indegree[v]++;
        }
    }

    queue<int> q;

    for (int i = 1; i <= n; i++) {
        if (indegree[i] == 0) {
            q.push(i);
        }
    }

    vector<int> order;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        order.push_back(u);

        for (int v : adj[u]) {
            if (--indegree[v] == 0) {
                q.push(v);
            }
        }
    }

    // if order.size() != n, graph has a cycle
    return order;
}

int main() {
    int n = 4;
    vector<vector<int>> adj(n + 1);
    adj[1].push_back(2);
    adj[1].push_back(3);
    adj[2].push_back(4);
    adj[3].push_back(4);

    auto order = topoSort(n, adj);

    for (int u : order) {
        cout << u << " ";
    }

    cout << "\\n"; // 1 2 3 4 (or 1 3 2 4)
    return 0;
}
`,

    z_function: `#include <bits/stdc++.h>
using namespace std;

// Z Function
vector<int> zFunction(string s) {
    int n = s.size();
    vector<int> z(n);

    int l = 0;
    int r = 0;

    for (int i = 1; i < n; i++) {
        if (i <= r) {
            z[i] = min(r - i + 1, z[i - l]);
        }

        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }

        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }

    return z;
}

int main() {
    string s = "aabxaa";
    auto z = zFunction(s);

    for (int x : z) {
        cout << x << " ";
    }

    cout << "\\n"; // 0 1 0 0 2 1
    return 0;
}
`,
  },

  java: {
    binary_search: `// Binary Search
static int binarySearch(int[] a, int x) {
    int l = 0;
    int r = a.length - 1;

    while (l <= r) {
        int m = l + (r - l) / 2;

        if (a[m] == x) {
            return m;
        }

        if (a[m] < x) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }

    return -1;
}
`,

    dsu: `// DSU
static class DSU {
    int[] parent;
    int[] size;

    DSU(int n) {
        parent = new int[n + 1];
        size = new int[n + 1];

        for (int i = 0; i <= n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    int find(int x) {
        if (parent[x] == x) {
            return x;
        }

        return parent[x] = find(parent[x]);
    }

    boolean unite(int a, int b) {
        a = find(a);
        b = find(b);

        if (a == b) {
            return false;
        }

        if (size[a] < size[b]) {
            int temp = a;
            a = b;
            b = temp;
        }

        parent[b] = a;
        size[a] += size[b];

        return true;
    }
}
`,

    dijkstra: `// Dijkstra
static long[] dijkstra(int n, ArrayList<int[]>[] adj, int src) {
    long INF = (long) 1e18;

    long[] dist = new long[n + 1];
    Arrays.fill(dist, INF);

    PriorityQueue<long[]> pq = new PriorityQueue<>(
        (a, b) -> Long.compare(a[0], b[0])
    );

    dist[src] = 0;
    pq.offer(new long[] {0, src});

    while (!pq.isEmpty()) {
        long[] cur = pq.poll();

        long d = cur[0];
        int u = (int) cur[1];

        if (d != dist[u]) {
            continue;
        }

        for (int[] e : adj[u]) {
            int v = e[0];
            int w = e[1];

            if (d + w < dist[v]) {
                dist[v] = d + w;
                pq.offer(new long[] {dist[v], v});
            }
        }
    }

    return dist;
}
`,

    segment_tree: `// Segment Tree
static class SegTree {
    long[] tree;
    int n;

    SegTree(int n) {
        this.n = n;
        tree = new long[4 * n];
    }

    void update(int node, int l, int r, int idx, long val) {
        if (l == r) {
            tree[node] = val;
            return;
        }

        int mid = (l + r) / 2;

        if (idx <= mid) {
            update(2 * node, l, mid, idx, val);
        } else {
            update(2 * node + 1, mid + 1, r, idx, val);
        }

        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    long query(int node, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) {
            return 0;
        }

        if (ql <= l && r <= qr) {
            return tree[node];
        }

        int mid = (l + r) / 2;

        return query(2 * node, l, mid, ql, qr)
             + query(2 * node + 1, mid + 1, r, ql, qr);
    }
}
`,

    fenwick: `// Fenwick Tree
static class Fenwick {
    long[] bit;
    int n;

    Fenwick(int n) {
        this.n = n;
        bit = new long[n + 1];
    }

    void add(int idx, long val) {
        while (idx <= n) {
            bit[idx] += val;
            idx += idx & -idx;
        }
    }

    long sum(int idx) {
        long ans = 0;

        while (idx > 0) {
            ans += bit[idx];
            idx -= idx & -idx;
        }

        return ans;
    }
}
`,

    sieve: `// Sieve
static boolean[] sieve(int n) {
    boolean[] prime = new boolean[n + 1];
    Arrays.fill(prime, true);

    if (n >= 0) {
        prime[0] = false;
    }

    if (n >= 1) {
        prime[1] = false;
    }

    for (int i = 2; i * i <= n; i++) {
        if (prime[i]) {
            for (int j = i * i; j <= n; j += i) {
                prime[j] = false;
            }
        }
    }

    return prime;
}
`,

    modexp: `// Modular Exponentiation
static long modPow(long a, long b, long mod) {
    long ans = 1;

    while (b > 0) {
        if ((b & 1) == 1) {
            ans = ans * a % mod;
        }

        a = a * a % mod;
        b >>= 1;
    }

    return ans;
}
`,

    kmp: `// KMP Prefix Function
static int[] prefixFunction(String s) {
    int n = s.length();
    int[] pi = new int[n];

    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];

        while (j > 0 && s.charAt(i) != s.charAt(j)) {
            j = pi[j - 1];
        }

        if (s.charAt(i) == s.charAt(j)) {
            j++;
        }

        pi[i] = j;
    }

    return pi;
}
`,

    mod_arithmetic: `// Modular Arithmetic
static final long MOD = (long) 1e9 + 7;

static long add(long a, long b) {
    return (a + b) % MOD;
}

static long sub(long a, long b) {
    return ((a - b) % MOD + MOD) % MOD;
}

static long mul(long a, long b) {
    return (a % MOD) * (b % MOD) % MOD;
}

static long modPow(long a, long b, long mod) {
    long ans = 1;

    while (b > 0) {
        if ((b & 1) == 1) {
            ans = ans * a % mod;
        }

        a = a * a % mod;
        b >>= 1;
    }

    return ans;
}

static long inv(long a) {
    return modPow(a, MOD - 2, MOD);
}

static long divide(long a, long b) {
    return mul(a, inv(b));
}
`,

    trie: `// Trie
static class Trie {
    int[][] children;
    boolean[] isEnd;
    int size;

    Trie(int maxNodes) {
        children = new int[maxNodes][26];
        isEnd = new boolean[maxNodes];
        size = 1;

        for (int[] row : children) {
            Arrays.fill(row, -1);
        }
    }

    void insert(String s) {
        int cur = 0;

        for (char c : s.toCharArray()) {
            int ch = c - 'a';

            if (children[cur][ch] == -1) {
                children[cur][ch] = size++;
            }

            cur = children[cur][ch];
        }

        isEnd[cur] = true;
    }

    boolean search(String s) {
        int cur = 0;

        for (char c : s.toCharArray()) {
            int ch = c - 'a';

            if (children[cur][ch] == -1) {
                return false;
            }

            cur = children[cur][ch];
        }

        return isEnd[cur];
    }

    boolean startsWith(String s) {
        int cur = 0;

        for (char c : s.toCharArray()) {
            int ch = c - 'a';

            if (children[cur][ch] == -1) {
                return false;
            }

            cur = children[cur][ch];
        }

        return true;
    }
}
`,

    topological_sort: `// Topological Sort (Kahn's Algorithm)
static int[] topoSort(int n, ArrayList<Integer>[] adj) {
    int[] indegree = new int[n + 1];

    for (int u = 1; u <= n; u++) {
        for (int v : adj[u]) {
            indegree[v]++;
        }
    }

    Queue<Integer> q = new LinkedList<>();

    for (int i = 1; i <= n; i++) {
        if (indegree[i] == 0) {
            q.offer(i);
        }
    }

    int[] order = new int[n];
    int idx = 0;

    while (!q.isEmpty()) {
        int u = q.poll();
        order[idx++] = u;

        for (int v : adj[u]) {
            if (--indegree[v] == 0) {
                q.offer(v);
            }
        }
    }

    // if idx != n, graph has a cycle
    return order;
}
`,

    z_function: `// Z Function
static int[] zFunction(String s) {
    int n = s.length();
    int[] z = new int[n];

    int l = 0;
    int r = 0;

    for (int i = 1; i < n; i++) {
        if (i <= r) {
            z[i] = Math.min(r - i + 1, z[i - l]);
        }

        while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) {
            z[i]++;
        }

        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }

    return z;
}
`,
  },
};