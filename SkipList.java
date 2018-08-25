//Bao Hong
//COP 3503 Summer 2018
import java.util.ArrayList;
import java.util.HashSet;

//Node Class
class Node<AnyType extends Comparable<AnyType>>
{
    //basic necesities of a SkipList node
    private int mHeight;
    private AnyType mData;
    private ArrayList<Node<AnyType>> mNext = new ArrayList<Node<AnyType>>(); //arraylist to store a typical node's next pointers
    
    //Node's functions
    Node(int height)
    {
        mHeight = height;
        for(int i=0; i < height; i++)
            mNext.add(null);
    }
    
    Node(AnyType data, int height)
    {
        mData = data;
        mHeight = height;
        for(int i=0; i < height; i++)
            mNext.add(null);
    }
    
    public AnyType value()
    {
        return this.mData;
    }
    
    public int height()
    {
        return this.mHeight;
    }
    
    public Node<AnyType> next(int level)
    {
        if(level < 0 || level > (this.mHeight-1))
            return null;
        return this.mNext.get(level);
    }
    
    public void setNext(int level, Node<AnyType> node)
    {
        this.mNext.set(level, node);   
    }
    
    public void grow()
    {
        this.mHeight += 1; 
        this.mNext.add(null);
    }
    
    public void maybeGrow()
    {
        int rand = (int) (Math.random() * 2);//flip coin to generate the probability for nodes that need to grow
        if(rand == 1)
        {
            this.mHeight += 1;
            mNext.add(null);
        }
    }
    
    public void trim(int height)
    {
        
        while(mHeight > height)
        {
            this.mNext.remove(mHeight-1);
            --this.mHeight;
        }
    }

}

public class SkipList<AnyType extends Comparable<AnyType>>
{
    private Node<AnyType> head, temp, prev;
    private int size = 0;
    
    SkipList()
    {
        head = new Node<AnyType>(1);
    }
    
    SkipList(int height)
    {
        if(height < 1)
            head = new Node<AnyType>(1);
        head = new Node<AnyType>(height);
    }
    
    public int height(){
        return head.height();
    }
    
    public int size(){
        return size;
    }

    public Node<AnyType> head(){
        return head;
    }
    
    private static int generateRandomHeight(int maxHeight)
    {
        int i=1;
        for(int j = 1; j<=maxHeight; j++)
        {
            if((int)(Math.random()*2) == 1) //flip coin
            {
                i=j;
                break;
            }
            
        }
        return i;
    }
    
    private static int getMaxHeight(int n)
    {
        int maxHeight = (int) Math.ceil(Math.log10((double)n)/Math.log10(2));
        return maxHeight;
    }
    
    //insert with random height
    public void insert(AnyType data){
        Node<AnyType> newNode = new Node<AnyType>(data, generateRandomHeight(head.height()));//a new node has been born and need to assimilate into the SkipList
        size++;
        //a newNode cause the list to grow
        if((int) Math.ceil(Math.log10((double)size)/Math.log10(2)) > head.height())
        {
            
            head.grow();
            temp = head;
            prev = head;
            while(temp != null)
            {
                temp = temp.next(head.height()-2);
                if(temp == null)
                    break;
                int i= temp.height();
                temp.maybeGrow();
                if(temp.height()-i == 1)
                {
                    prev.setNext(prev.height()-1, temp);
                    prev = temp;
                }
                   
            }       
        }
        
        //put the new created node into the list
        temp = head;
        int i = head.height() - 1;
        ArrayList<Node<AnyType>> mayUpdate = new ArrayList<>();
        //find a place for new Node in the SkipList
        while(i>=-1)
        {    
            //move down one level if this level is pointing to nothing
            if(temp.next(i) == null)
            {
                //this node is probably to be added at the end of the list
                if(i < 0)
                {
                    for(int j=0, k=mayUpdate.size()-1; j<newNode.height(); j++,k--)
                    {
                        newNode.setNext(j, mayUpdate.get(k).next(j));
                        mayUpdate.get(k).setNext(j, newNode);
                        
                    }
                    break;
                }
                mayUpdate.add(temp);
                i--;
                
                continue;
            }
            //the level is pointing to something
            if(temp.next(i) != null)
            {
                //the new node need to be put in the middle of 2 nodes
                if((data.compareTo(temp.next(0).value()) <= 0) && (temp == head || data.compareTo(temp.value()) >0)  && i<=0)
                {
                    mayUpdate.add(temp);
                  
                    for(int j=0, k = mayUpdate.size()-1; j<newNode.height(); j++, k--)
                    {
                        newNode.setNext(j, mayUpdate.get(k).next(j));
                        mayUpdate.get(k).setNext(j, newNode);
                    }
                    break;
                    
                }
                //move to the next node on the same level if the data is bigger that the next node
                if(data.compareTo(temp.next(i).value()) > 0)
                {
                    temp = temp.next(i);
                    continue;
                }
                //move down one level if the the newNode's data is equal or less than the next node's data
                if(data.compareTo(temp.next(i).value()) <= 0)
                {
             
                    mayUpdate.add(temp);
                    i--;
         
                    continue; 
                }
                    
            }
        }
        
    }
    
    //insert with a specific height
    public void insert(AnyType data, int height)
    {
        Node<AnyType> newNode = new Node<AnyType>(data, height);
        size++;
        //Skiplist need to grow
        if((int) Math.ceil(Math.log10((double)size)/Math.log10(2)) > head.height())
        {
            head.grow();
        }
        //same logic with the random insert function from here
        temp = head;
        int i = head.height() - 1;
        ArrayList<Node<AnyType>> mayUpdate = new ArrayList<>();
        while(i>=-1)
        {    
            
            if(temp.next(i) == null)
            {
                
                if(i < 0)
                {
                    for(int j=0, k=mayUpdate.size()-1; j<newNode.height(); j++,k--)
                    {
                        newNode.setNext(j, mayUpdate.get(k).next(j));
                        mayUpdate.get(k).setNext(j, newNode);
                        
                    }
                    break;
                }
                mayUpdate.add(temp);
                i--;
                
                continue;
            }
            if(temp.next(i) != null)
            {
                
                if((data.compareTo(temp.next(0).value()) <= 0) && (temp == head || data.compareTo(temp.value()) >0)  && i<=0)
                {
                    mayUpdate.add(temp);
                 
                    for(int j=0, k = mayUpdate.size()-1; j<newNode.height(); j++, k--)
                    {
                        newNode.setNext(j, mayUpdate.get(k).next(j));
                        mayUpdate.get(k).setNext(j, newNode);
                        
                    }
                    break;
                    
                }
                if(data.compareTo(temp.next(i).value()) > 0)
                {
                    temp = temp.next(i);
                    continue;
                }
                if(data.compareTo(temp.next(i).value()) <= 0)
                {
                    mayUpdate.add(temp);
                    i--;
                    continue; 
                }
                    
            }
        }
        
    }
    
    public void delete(AnyType data)
    {
        //nothing to delete
        if(!this.contains(data))
            return;
        temp = head;
        int i = head.height() - 1;
        size--;
        int s = size;
        //the m val keep the height never less than 1
        if(size <= 1)
            s = 2;
        int m = (int) Math.ceil(Math.log10((double) s)/Math.log10(2));
        
        //a hash set to help detect nodes with same value
        HashSet<Node<AnyType>> dupValue = new HashSet<>();
        ArrayList<Node<AnyType>> mayPointToDup = new ArrayList<>();
        //search and destroy while loop
        while(i >= 0)
        {
            //move down one level this level is pointing to nothing
            if(temp.next(i) == null)
            {
                i--;
                continue;
            }
            //it's really pointing to something
            if(temp.next(i) != null)
            {
                //found the val need to delete but dont rush
                if(data.compareTo(temp.next(i).value()) == 0)
                {
                    //there is probably multiple nodes with same vals, change to the target that is at the leftmost of the SkipList
                    if(!dupValue.contains(temp.next(i)))
                    {
                        dupValue.add(temp.next(i));
                        mayPointToDup.clear();
                        mayPointToDup.add(temp);
                    }
                    else
                        mayPointToDup.add(temp);
                    //delete process
                    if(i <= 0)
                    {
                        int l = temp.next(i).height();
                        for(int k=mayPointToDup.size()-1, j=0; k>=0 && j<l; k--,j++)
                        {
                            mayPointToDup.get(k).setNext(j, mayPointToDup.get(k).next(j).next(j));
                        }
                    }
                    i--;
                    continue;
                }   
                //move down if the value of the next node on this level is bigger than desire deleting val
                if(data.compareTo(temp.next(i).value()) < 0)
                {
                    i--;
                    continue;
                }
                //move to the next node if the next val is less than the desire val
                if(data.compareTo(temp.next(i).value()) > 0)
                {
                    temp = temp.next(i);
                    continue;
                }
                
                    
            }
        }
        //trim the list if needed
        temp = head;
        if(m < (head.height()))
        {
            ArrayList<Node<AnyType>> trimNode= new ArrayList<>();
 
            int needTrim = head.height()-m;
            
            while(needTrim > 0)
            {
                while(temp != null)
                {
                trimNode.add(temp);
                temp = temp.next(head.height()-1);
                }
                for(int k=trimNode.size()-1; k >=0; k--)
                {
                trimNode.get(k).trim(head.height()-1);
                }
                needTrim = head.height()-m;
                temp=head;
                trimNode.clear();
                
            }
        }
    }
    
    public boolean contains(AnyType data)
    {
        temp = head;
        int i = head.height()-1;
        //finding
        while(i >= -1)
        {
            if(temp.next(i) == null)
            {
                i--;
                if(i<0)
                    return false;
                continue;
            }
            if(temp.next(i) != null)
            {
                //found it!!!
                if(data.compareTo(temp.next(i).value()) == 0)
                    return true;
                //the val is probably not in the list 
                if(data.compareTo(temp.next(0).value()) <= 0 && (temp == head || data.compareTo(temp.value())>0)  && i<=0)
                {
                    return false;
                }
                if(data.compareTo(temp.next(i).value()) < 0)
                {
                    i--;
                    continue;
                }
                if(data.compareTo(temp.next(i).value()) > 0)
                {
                    temp = temp.next(i);
                    continue;
                }
                
            }
                
        }
        
        return false;
    }
    
    public Node<AnyType> get(AnyType data)
    {
        //not found
        if(!this.contains(data))
            return null;
        temp = head;
        int i = head.height()-1;
        while(i >= -1)
        {
            if(temp.next(i) == null)
            {
                i--;
                //not found
                if(i<0)
                    return null;
                continue;
            }
            if(temp.next(i) != null)
            {
                //found it!!!
                if(data.compareTo(temp.next(i).value()) == 0)
                {
                    return temp.next(i);
                }
                //not found
                if(data.compareTo(temp.next(0).value()) <= 0 && (temp == head || data.compareTo(temp.value())>0)  && i<=0)
                {
                    return null;
                }
                //move down
                if(data.compareTo(temp.next(i).value()) < 0)
                {
                    i--;
                    continue;
                }
                //move next
                if(data.compareTo(temp.next(i).value()) > 0)
                {
                    temp = temp.next(i);
                    continue;
                }   
            }      
        }
        return null;
    }
    
    public static double difficultyRating()
    {
        return 4.0;
    }
    
    public static double hoursSpent()
    {
        return 20.0;
    }
   
}
