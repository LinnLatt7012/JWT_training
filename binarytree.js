class Node {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  const a = new Node('a');
  const b = new Node('b');
  const c = new Node('c');
  const d = new Node('d');
  const e = new Node('e');
  const f = new Node('f');
  
  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.right = f;
  //      a
  //    /   \
  //   b     c
  //  / \     \
  // d   e     f

  const breadthFirstValues = (root) => {
      const current = root.shift()
      if(!current) return []
      if(current.left!=null) root.push(current.left)
      if(current.right!=null) root.push(current.right)
      const value=breadthFirstValues(root)
      return [current.val, ...value ]
    };
    console.log("result ",breadthFirstValues([a]))
  
    const include = (root, key) => {
      const current = root.shift()
      if(!current) return false
      if(current.val===key) return true
      if(current.left!=null) root.push(current.left)
      if(current.right!=null) root.push(current.right)
      return include(root,key)
    
      // if(root===null) return false;
      // if(root.val===key) return true;
      // return include(root.left,key) || include(root.right,key)
    };
    console.log("Include ",include([a],'c'))
  
    const a1 = new Node(10);
    const b1 = new Node(2);
    const c1 = new Node(3);
    const d1 = new Node(4);
    const e1 = new Node(5);
    const f1 = new Node(10);
    a1.left = b1;
    a1.right = c1;
    b1.left = d1;
    b1.right = e1;
    c1.right = f1;
    //      a
  //    /   \
  //   b     c
  //  / \     \
  // d   e     f 
    const sum = (root) => {
      // const current = root.shift()
      // if(!current) return 0
      // if(current.left!=null) root.push(current.left)
      // if(current.right!=null) root.push(current.right)
      // const value = current.val+sum(root)
      // return value
      if(root===null) return 0;
      return root.val+ sum(root.left) + sum(root.right)
    };
    console.log("sum ",sum(a1))
  
    const min = (root) => {
      const current = root.shift()
      if(!current) return Infinity
      if(current.left!=null) root.push(current.left)
      if(current.right!=null) root.push(current.right)
      const value = min(root)
      if(current.val < value){
          return current.val
      }else{
          return value
      }
    }
    const max = (root) => {
      const current = root.shift()
      if(!current) return -Infinity
      if(current.left!=null) root.push(current.left)
      if(current.right!=null) root.push(current.right)
      const value = max(root)
      if(current.val > value){
          return current.val
      }else{
          return value
      }
    }
    console.log("min ",min([a1]))
    console.log("max ",max([a1]))
  
    const maxpath = (root) => {
      if(!root) return -Infinity
      if(root.left===null && root.right===null) return root.val
      const maxChild = Math.max(
          maxpath(root.left),
          maxpath(root.right)
      )
  
      return root.val+maxChild
    }
    console.log("maxpath",maxpath(a1))