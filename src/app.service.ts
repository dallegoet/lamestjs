import { Injectable } from '@nestjs/common';
import path from 'path';

@Injectable()
export class AppService {
  private session: any;

  constructor() {
    import('node-llama-cpp').then((nodeLLamaCpp) => {
      const model = new nodeLLamaCpp.LlamaModel({
        modelPath: path.join(__dirname, 'models', 'codellama-13b.Q3_K_M.gguf'),
      });
      const context = new nodeLLamaCpp.LlamaContext({ model });

      this.session = new nodeLLamaCpp.LlamaChatSession({ context });
    });
  }

  async getHello(): Promise<string> {
    if (!this.session || !this.session.initialized) {
      throw new Error('Session not initialized');
    }

    return await this.session.prompt('qui est tu ?');
  }
}
