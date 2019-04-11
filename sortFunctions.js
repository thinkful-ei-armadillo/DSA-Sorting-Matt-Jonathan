const LinkedList = require('./linkedList');

// swap
function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

// bubbleSort
function bubbleSort(array) {
  let swaps = 0;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1);
      swaps++;
    }
  }

  if (swaps > 0) {
    return bubbleSort(array);
  }
  return array;
}
let runCount = 1;
// mergeSort
function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);

  // merge
  const merge = (left, right, array) => {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        array[outputIndex++] = left[leftIndex++];
      }
      else {
        array[outputIndex++] = right[rightIndex++];
      }
    }

    for (let i = leftIndex; i < left.length; i++) {
      array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
      array[outputIndex++] = right[i];
    }
    return array;
  };

  return merge(left, right, array);
}

// quickSort
function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }

  // partition
  const partition = (array, start, end) => {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
      if (array[i] <= pivot) {
        swap(array, i, j);
        j++;
      }
    }
    swap(array, end - 1, j);
    return j;
  };

  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

const str =
  '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';

const tArr = str.split(' ').map(i => Number(i));

//console.log({ bubbleSort: bubbleSort(testArray) });
console.log({ mergeSort: mergeSort(tArr) });
//console.log({ quickSort: quickSort(tArr) });

function sortingWithLinkedList() {
  const testArray = [21, 1, 26, 45, 29, 28, 2, 9, 16];
  let LLS = new LinkedList();
  
  for (let i = 0; i < testArray.length; i++) {
    LLS.insertLast(testArray[i]);
  }
  
  const splitList = (LLS) => {
    let currentNode = LLS.head;
    while (currentNode.next !== null) {
      let middle = middleOfList(LLS);
      let secondHalf = middleOfList(LLS).next;
      currentNode = middle;
      currentNode.next = null;
    }
    
    return LLS;
  };
  while (size(LLS) > 1) {
    console.log('ran');
    splitList(LLS);

  }
}

sortingWithLinkedList();



//-----------------------------------------------------------

// Questions
// 1) Understanding quicksort
// 1. False, the first half of the array is the same if 17 or 14 were the pivot.
// 2. True, both 17 and 14 are less than 20 so they COULD of been the pivot.
// 3. False, both for 17 and 14 the numbers to the left are less and to the right are greater.
// 4. False, the first half of the array is the same if 17 or 14 were the pivot.

// 2)
// 1. 13 15 10 3 9 12 17 16 19 14
// 2. 12 13 10 3 9 17 15 16 19 14

function middleOfList(sll) {
  let middleNodeTracker = sll.head;
  let fastNodeTracker = sll.head;

  while (fastNodeTracker.next !== null) {
    middleNodeTracker = middleNodeTracker.next;
    fastNodeTracker = fastNodeTracker.next.next;
  }
  return middleNodeTracker;
}

function display(sll) {
  let currNode = sll.head;
  let i = 0;
  while (currNode !== null) {
    console.log(i, currNode);
    i++;
    currNode = currNode.next;
  }
}

function size(sll) {
  let currNode = sll.head;
  let i = 0;
  while (currNode !== null) {
    i++;
    currNode = currNode.next;
  }
  return i;
}

function isEmpty(sll) {
  if (sll.head === null) {
    return 'Empty';
  }
  return 'Not empty';
}

function findPrevious(sll, item) {
  let currNode = sll.head;
  let prevNode = sll.head;

  if (sll.head === null) {
    return 'Empty list';
  }

  if (sll.head.value === item) {
    return 'No previous value';
  }

  while (currNode.value !== item) {
    prevNode = currNode;
    currNode = currNode.next;
  }
  return prevNode;
}

function findLast(sll) {
  let currNode = sll.head;

  while (currNode.next !== null) {
    currNode = currNode.next;
  }
  return currNode;
}

function reverseList(sll) {
  let currNode = sll.head;
  let reverseHead = null;

  while (currNode !== null) {
    // keep the value from current node
    let tempNode = currNode.next;
    currNode.next = reverseHead;
    reverseHead = currNode;
    // assign current node to tempNode
    currNode = tempNode;

  }
  sll.head = reverseHead;
  return sll;
}

function findThirdFromEnd(sll) {
  let currNode = sll.head;

  while (currNode.next.next !== null) {
    currNode = currNode.next;
  }
  return currNode;
}
