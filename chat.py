def chat(docsearch,chain, query):
    print('inside chat')
    docs = docsearch.similarity_search(query)
    return chain.run(input_documents=docs, question=query)
