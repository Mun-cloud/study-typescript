import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }

  /**
   * 블럭 자체를 리턴하면 사용자가 데이터에 직접 접근하여 해킹할 수 있음
   * ex) blockchain.getBlocks().push(new Block("xxxx", 1111, "Hackeddd"))
   * 따라서 같은 배열을 만들어서 리턴해주는 것이 보안에 좋음.
   * */
  public getBlocks() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");

console.log(blockchain.getBlocks());
